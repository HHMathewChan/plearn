import { useEffect, useState } from "react";
import { getDataForLearningPreferencesSurvey, createStudentLearningPreferences } from "../Services/StudentLearningPreferenceService";
import type { LearningModes, Topic, ChosenTopic } from "../Types/StudentLearningPreferenceType";
import { useNavigate } from "react-router-dom";
import {getStudentCode} from "../Services/PlatformUserService";

/**
 * A simple learning-preferences survey page.
 * - Fetches survey data on mount.
 * - Lets the student choose a learning mode.
 * - Lets the student choose up to 3 topics and rate interest & knowledge for each.
 * - Submits preferences to the backend.
 */
const StudentLearningPreferenceSurvey: React.FC = () => {
    const [learningModes, setLearningModes] = useState<LearningModes[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedLearningMode, setSelectedLearningMode] = useState<string>("");
    const [selectedTopics, setSelectedTopics] = useState<Record<string, { interest_level: ChosenTopic["interest_level"]; knowledge_proficiency: ChosenTopic["knowledge_proficiency"] }>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getDataForLearningPreferencesSurvey();
                if (!mounted) return;
                setLearningModes(data.learningModes || []);
                setTopics(data.topics || []);
            } catch (err) {
                console.error("Error fetching survey data:", err);
                if (mounted) setError("Failed to load survey data.");
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchData();
        return () => { mounted = false; };
    }, []);

    const toggleTopic = (topicId: string) => {
        const alreadySelected = Object.prototype.hasOwnProperty.call(selectedTopics, topicId);
        if (alreadySelected) {
            const newSelection = { ...selectedTopics };
            delete newSelection[topicId];
            setSelectedTopics(newSelection);
            return;
        }
        if (Object.keys(selectedTopics).length >= 3) {
            setError("You may select up to three preferred topics.");
            return;
        }
        setSelectedTopics({
            ...selectedTopics,
            [topicId]: { interest_level: "medium", knowledge_proficiency: "novice" }
        });
        setError(null);
    };

    const updateTopicDetail = (topicId: string, field: "interest_level" | "knowledge_proficiency", value: string) => {
        if (!selectedTopics[topicId]) return;
        setSelectedTopics({
            ...selectedTopics,
            [topicId]: {
                ...selectedTopics[topicId],
                [field]: value as any
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const studentCode = getStudentCode();
        if (!studentCode) {
            setError("Cannot determine student code. Please sign in again.");
            return;
        }
        if (!selectedLearningMode) {
            setError("Please select a learning mode.");
            return;
        }
        const chosen: ChosenTopic[] = Object.keys(selectedTopics).map((topic_id) => ({
            topic_id,
            interest_level: selectedTopics[topic_id].interest_level,
            knowledge_proficiency: selectedTopics[topic_id].knowledge_proficiency
        }));

        if (chosen.length === 0) {
            setError("Please select at least one preferred topic (up to three).");
            return;
        }

        setLoading(true);
        try {
            const resp = await createStudentLearningPreferences(studentCode, selectedLearningMode, chosen);
            console.log("Create preferences response:", resp);
            setSuccessMessage("Preferences saved. You will be redirected shortly.");
            // small delay then navigate back to courses
            setTimeout(() => navigate("/courses"), 10000);
        } catch (err) {
            console.error("Error submitting preferences:", err);
            setError("Failed to save preferences. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Learning preferences survey</h1>

            {loading && <p>Loading…</p>}
            {error && <p className="text-red-600 mb-3" role="alert">{error}</p>}
            {successMessage && <p className="text-green-600 mb-3">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <section>
                    <h2 className="font-semibold mb-2">Select a learning mode</h2>
                    <div className="space-y-2">
                        {learningModes.length === 0 && <p className="text-sm text-gray-600">No learning modes available.</p>}
                        {learningModes.map((mode) => (
                            <label key={mode.id} className="flex items-centre space-x-2">
                                <input
                                    type="radio"
                                    name="learningMode"
                                    value={mode.id}
                                    checked={selectedLearningMode === mode.id}
                                    onChange={() => setSelectedLearningMode(mode.id)}
                                />
                                <span>
                                    <strong>{mode.mode_name}</strong>
                                    {mode.description && <span className="text-sm text-gray-600 ml-2">— {mode.description}</span>}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="font-semibold mb-2">Choose up to three preferred topics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {topics.map((t) => {
                            const checked = Boolean(selectedTopics[t.id]);
                            return (
                                <div key={t.id} className="border rounded p-2">
                                    <label className="flex items-centre space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleTopic(t.id)}
                                        />
                                        <span className="font-medium">{t.name}</span>
                                    </label>

                                    {checked && (
                                        <div className="mt-2 space-y-2">
                                            <label className="block">
                                                <span className="text-sm">Knowledge proficiency</span>
                                                <select
                                                    value={selectedTopics[t.id].knowledge_proficiency}
                                                    onChange={(e) => updateTopicDetail(t.id, "knowledge_proficiency", e.target.value)}
                                                    className="mt-1 block w-full border rounded p-1"
                                                >
                                                    <option value="novice">Novice</option>
                                                    <option value="intermediate">Intermediate</option>
                                                    <option value="proficient">Proficient</option>
                                                </select>
                                            </label>

                                            <label className="block">
                                                <span className="text-sm">Interest level</span>
                                                <select
                                                    value={selectedTopics[t.id].interest_level}
                                                    onChange={(e) => updateTopicDetail(t.id, "interest_level", e.target.value)}
                                                    className="mt-1 block w-full border rounded p-1"
                                                >
                                                    <option value="high">High</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="low">Low</option>
                                                </select>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                <div className="flex items-centre space-x-3">
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
                        {loading ? "Submitting…" : "Save preferences"}
                    </button>
                    <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 border rounded">
                        Cancel
                    </button>
                </div>
            </form>
            {loading && <p>Loading…</p>}
            {error && <p className="text-red-600 mb-3" role="alert">{error}</p>}
            {successMessage && <p className="text-green-600 mb-3">{successMessage}</p>}
        </div>
    );
};

export default StudentLearningPreferenceSurvey;