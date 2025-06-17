/**
 * This hook manages the state and lifecycle of multiple courses.
 */
import { useEffect, useState } from "react";
import type { Courses } from "../Types/CourseType";
import { getCoursesWithMetadata} from "../Services/CourseService";

export function useCourses() {
  const [courses, setCourses] = useState<Courses>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCoursesWithMetadata()
      .then(response => setCourses(response))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []); {/* Empty dependency array ensures this runs only once on mount */}

  return { courses, loading, error };
}