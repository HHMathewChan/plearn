import type{ Topic } from './TopicType';
export type CopyrightOwner = {
  id: number;
  name: string;
  type: string;
  contact_email: string;
  license_type: string;
  license_url: string;
};

export type CourseWithMetadata = {
  id: string;
  course_code: string;
  title: string;
  description: string;
  copyrightOwner: CopyrightOwner;
  topic: Topic;
};

// The type representing an array of courses with their owners
export type Courses = CourseWithMetadata[];