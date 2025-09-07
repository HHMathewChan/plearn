import type { CourseWithMetadata } from "./CourseType";
import type { CourseProgress } from "./CourseProgressType";

export type EnroledCourseWithMetaData = {
  course: CourseWithMetadata;
  courseProgress: CourseProgress;
};

export type EnroledCoursesWithMetaData = EnroledCourseWithMetaData[];