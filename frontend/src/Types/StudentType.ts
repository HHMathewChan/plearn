import type { CourseWithOwner } from "./CourseType";
import type { CourseProgress } from "./CourseProgressType";

export type EnroledCourseWithMetaData = {
  course: CourseWithOwner;
  courseProgress: CourseProgress;
};

export type EnroledCoursesWithMetaData = EnroledCourseWithMetaData[];