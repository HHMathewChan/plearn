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

export type CourseWithMetadata2 = {
  id: string;
  course_code: string;
  title: string;
  difficulty: string;
  description: string;
  copyrightOwner: CopyrightOwner;
  topic: Topic;
};

export type CourseWithRecommendation = {
  course: CourseWithMetadata2;
  score: number;
}

// The type representing an array of courses with their owners
export type Courses = CourseWithMetadata[];
export type RecommendedCourses = CourseWithRecommendation[];