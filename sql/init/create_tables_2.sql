-- Comprises (Course <-> CourseContent)
CREATE TABLE Comprises (
    course_id UUID,
    course_content_id UUID
);

-- EnrolsIn (Student <-> Enrolment)
CREATE TABLE EnrolsIn (
    student_code StudentCode,
    enrolment_id UUID
);

-- HasCourseReferenceTo (Course <-> CourseProgress)
CREATE TABLE HasCourseReferenceTo (
    course_id UUID,
    course_progress_id UUID
);

-- HasLearningModeFor (Student <-> LearningMode)
CREATE TABLE HasLearningModeFor (
    learning_mode_id UUID,
    student_code StudentCode
);

-- HasStudentProfileIn (User <-> Student)
CREATE TABLE HasStudentProfileIn (
    student_code StudentCode,
    user_id UUID
);

-- HasTopicReferenceTo (Topic <-> ChosenTopic)
CREATE TABLE HasTopicReferenceTo (
    chosen_topic_id UUID,
    topic_id UUID
);

-- InterestedIn (ChosenTopic <-> Student)
CREATE TABLE InterestedIn (
    chosen_topic_id UUID,
    student_code StudentCode
);

-- HasContentProgressFor (ContentProgress <-> Student)
CREATE TABLE HasContentProgressFor (
    content_progress_id UUID,
    student_code StudentCode
);

-- HasCourseProgressFor (CourseProgress <-> Student)
CREATE TABLE HasCourseProgressFor (
    course_progress_id UUID,
    student_code StudentCode
);

-- LogContentProgressAt (CourseContent <-> ContentProgress)
CREATE TABLE LogContentProgressAt (
    course_content_id UUID,
    content_progress_id UUID
);

-- LogCourseProgressAt (Course <-> CourseProgress)
CREATE TABLE LogCourseProgressAt (
    course_id UUID,
    course_progress_id UUID
);

-- OwnCourseBy (Course <-> CopyrightOwner)
CREATE TABLE OwnCourseBy (
    course_id UUID,
    copyright_owner_id UUID
);

-- LabelContentWith (Topic <-> CourseContent)
CREATE TABLE LabelContentWith (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID,
    course_content_id UUID
);

-- LabelCourseWith (Topic <-> Enrolment)
CREATE TABLE LabelCourseWith (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID,
    enrolment_id UUID
);