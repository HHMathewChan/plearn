import { type Courses } from "../Types/CourseType";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function getCoursesWithMetadata(): Promise<Courses> {
  const response = await fetch(`${API_BASE}/course-routes/courses/metadata`);
  if (!response.ok) throw new Error("Failed to fetch courses");
  const data = await response.json();
  return data.courses;
}