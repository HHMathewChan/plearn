const studentService = require('./studentService');
const courseService = require('./courseService');
/*
  Simple course recommender using:
   - student learning preference
   - topics from completed courses & final quiz result
   - course metadata (topics, difficulty, deliveryModes, popularity)
  Returns topN candidate courses ordered by score.
*/

const SECONDS_IN_DAY = 86400;

function exponentialDecay(daysAgo, halfLifeDays = 90) {
    // recency weight in (0,1]
    return Math.exp(-Math.log(2) * (daysAgo / halfLifeDays));
}

/**
 * Normalise a value to [0,1] given min/max
 */
function normalise(value, min = 0, max = 100) {
    if (max === min) return 0;
    return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

/**
 * Compute preference match:
 * returns 1 for strong match, 0.5 for partial, 0 for no match
 */
function preferenceMatchScore(studentPref, courseModes) {
    if (!studentPref) return 0.5;
    // studentPref could be array or single string
    const prefs = Array.isArray(studentPref) ? studentPref : [studentPref];
    const modes = new Set(courseModes || []);
    let matchCount = 0;
    for (const p of prefs) if (modes.has(p)) matchCount++;
    if (matchCount === 0) return 0;
    if (matchCount === prefs.length) return 1;
    return 0.5;
}

/**
 * Compute learning-mode match:
 * studentMode: 'beginner' | 'intermediate' | 'challenging'
 * courseDifficulty: 'easy' | 'medium' | 'hard'
 *
 * Returns 1.0 for exact match, 0.6 for adjacent (e.g. beginner <-> medium), 0.2 for opposite.
 */
function learningModeMatchScore(studentMode, courseDifficulty) {
    if (!studentMode || !courseDifficulty) return 0.5;
    const map = {
        beginner: 'easy',
        intermediate: 'medium',
        challenging: 'hard'
    };
    const preferred = map[studentMode];
    if (preferred === courseDifficulty) return 1.0;
    // adjacent pairs: beginner<->medium, medium<->hard
    const adjacentPairs = new Set(['easy|medium', 'medium|hard']);
    const pair1 = `${preferred}|${courseDifficulty}`;
    const pair2 = `${courseDifficulty}|${preferred}`;
    if (adjacentPairs.has(pair1) || adjacentPairs.has(pair2)) return 0.6;
    return 0.2;
}

/**
 * Main recommendation entry
 * repositories should expose:
 * - platformUserRepository.getStudent(studentCode)
 * - courseRepository.getCandidateCourses(filter)
 * - courseRepository.getCourseTopics(courseId)
 */
async function recommendCourses(
    studentCode,
    candidateCourseList, // optional prefiltered list of course objects
    topN = 10,
    config = {}
) {
    const {
        halfLifeDays = 90,
        weights = { topic: 0.5, mode: 0.2, difficulty: 0.2, popularity: 0 },
        goodThreshold = 0.8,
        poorThreshold = 0.5
    } = config;
    // for debugging
    console.log('In personaliseLearningService, recommendCourses, Received request with data:', { studentCode, candidateCourseList, topN, config });
    const studentProfile = await studentService.getStudentProfileForRecommendations(studentCode);
    // studentProfile.completedCourses: [{ courseId, finalScore (0..100), completedAt (ISO) }]
    const completedCourses = studentProfile.completedCoursesWithScores || [];

    // Precompute topic performance map { topic -> { weightedScoreSum, weightSum } }
    const topicStats = new Map();
    for (const completedCourse of completedCourses) {
        const daysAgo = (Date.now() - new Date(completedCourse.completedAt).getTime()) / 1000 / SECONDS_IN_DAY;
        const decay = exponentialDecay(daysAgo, halfLifeDays);
        const scoreNorm = normalise(completedCourse.finalScore, 0, 100); // 0..1
        const weight = decay; // can multiply by course credit if available
        const topicIDs = await courseService.getCourseTopicIDs(completedCourse.courseId);
        for (const topic of topicIDs) {
            const stats = topicStats.get(topic) || { weightedScoreSum: 0, weightSum: 0 };
            stats.weightedScoreSum += scoreNorm * weight;
            stats.weightSum += weight;
            topicStats.set(topic, stats);
        }
    }

    function getCourseTopicIDsFromCourse(course) {
        // Accept:
        // - course.topics = [id | {id, ...} ...]
        // - course.topic = id | {id, ...}
        // - course.topics missing -> []
        const topicsField = course.topics || course.topic;
        if (!topicsField) return [];
        if (Array.isArray(topicsField)) {
            return topicsField.map(t => (t && typeof t === 'object' ? t.id : t)).filter(Boolean);
        }
        // single topic (object or primitive)
        if (typeof topicsField === 'object') {
            return [topicsField.id].filter(Boolean);
        }
        return [topicsField];
    }

    function topicAffinityForCourse(course) {
        // compute average normalised score across course topics
        const topics = getCourseTopicIDsFromCourse(course);
        if (topics.length === 0) return 0;
        let accumulated = 0;
        for (const topic of topics) {
            const stats = topicStats.get(topic);
            if (stats && stats.weightSum > 0) {
                accumulated += stats.weightedScoreSum / stats.weightSum; // normalised 0..1
            } else {
                accumulated += 0;
            }
        }
        return accumulated / topics.length; // 0..1
    }

    function difficultyAdjustment(course, topicAffinity) {
        // course.difficulty: 'easy'|'medium'|'hard'
        // If student good in topicAffinity -> prefer harder courses, else easier
        if (topicAffinity >= goodThreshold) {
            if (course.difficulty === 'hard') return 1;
            if (course.difficulty === 'medium') return 0.6;
            return 0.2;
        } else if (topicAffinity <= poorThreshold) {
            if (course.difficulty === 'easy') return 1;
            if (course.difficulty === 'medium') return 0.6;
            return 0.1;
        } else {
            // middle ground prefers medium
            if (course.difficulty === 'medium') return 1;
            return 0.6;
        }
    }

    // Get candidate courses if not provided
    let candidates = candidateCourseList;
    if (!candidates) {
        /**Example of the candidates structure [{
                ...course,
                topic,
                copyrightOwner
        }]
        */
        candidates = await courseService.getAllCoursesMetadata();
    }
    // Score each candidate
    const scored = [];
    for (const course of candidates) {
        const topicAffinity = topicAffinityForCourse(course); // 0..1
        const modeScore = learningModeMatchScore(studentProfile.learningMode, course.difficulty);
        const diffScore = difficultyAdjustment(course, topicAffinity);
        const popularityScore = normalise(course.popularity || 0, 0, 1000); // adjust max as needed

        const finalScore =
            weights.topic * topicAffinity +
            weights.mode * modeScore +
            weights.difficulty * diffScore +
            weights.popularity * popularityScore;

        scored.push({ courseId: course.id, course, score: finalScore });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topN).map(s => ({ course: s.course, score: s.score }));
}

module.exports = { recommendCourses };