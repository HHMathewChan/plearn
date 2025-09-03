export type CourseProgress = {
  id: string;
  student_code: string;
  course_id: string;
  status: string;
  date_completed: Date | null;
  last_updated: Date;
};
