/**
 * This hook manages the state and lifecycle of multiple courses.
 */
import { useEffect, useState } from "react";
import type { RecommendedCourses} from "../Types/CourseType";
import { getPersonalisedCourseRecommendations } from "../Services/PersonalisedLearningService";
import { getStudentCode } from "../Services/PlatformUserService";

export function useRecommendationCourseList() {
  const [courses, setCourses] = useState<RecommendedCourses>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const studentCode = getStudentCode();

  useEffect(() => {
    if (!studentCode) {
        setError("Student code is not available.");
        setLoading(false);
        return;
    }
    const fetchRecommendations = async () => {
        try {
            const recommendations = await getPersonalisedCourseRecommendations(studentCode);
            setCourses(recommendations);
        } catch (error) {
            setError("Failed to load recommended courses.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchRecommendations();
  }, []); {/* Empty dependency array ensures this runs only once on mount */}

  return { courses, loading, error };
}