import { type Courses } from "../Types/CourseType";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export async function getCoursesWithMetadata(): Promise<Courses> {
  const response = await fetch(`${API_BASE_URL}/course-routes/courses/metadata`);
  if (!response.ok) throw new Error("Failed to fetch courses");
  const data = await response.json();
  return data.courses;
}