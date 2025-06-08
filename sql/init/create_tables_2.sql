-- Comprises (Course <-> CourseContent)
CREATE TABLE Comprises (
    course_id UUID NOT NULL, 
    course_content_id UUID PRIMARY KEY
);

-- EnrolsIn (Student <-> Enrolment)
CREATE TABLE EnrolsIn (
    student_code StudentCode NOT NULL,
    enrolment_id UUID PRIMARY KEY
);

-- HasContentProgressFor (ContentProgress <-> Student)
CREATE TABLE HasContentProgressFor (
    content_progress_id UUID PRIMARY KEY,
    student_code StudentCode NOT NULL
);

-- HasCourseProgressFor (CourseProgress <-> Student)
CREATE TABLE HasCourseProgressFor (
    course_progress_id UUID PRIMARY KEY,
    student_code StudentCode NOT NULL
);

--HasCoursrReferenceTo (Course <-> Enrolment)
CREATE TABLE HasCourseReferenceTo (
    enrolment_id UUID PRIMARY KEY,
    course_id UUID NOT NULL
);

-- HasLearningModeFor (Student <-> LearningMode)
CREATE TABLE HasLearningModeFor (
    learning_mode_id UUID NOT NULL,
    student_code StudentCode PRIMARY KEY
);

-- HasStudentProfileIn (PlatformUser <-> Student)
CREATE TABLE HasStudentProfileIn (
    student_code StudentCode UNIQUE NOT NULL,
    platform_user_id UUID PRIMARY KEY
);

-- HasTopicReferenceTo (Topic <-> ChosenTopic)
CREATE TABLE HasTopicReferenceTo (
    chosen_topic_id UUID PRIMARY KEY,
    topic_id UUID NOT NULL
);

-- InterestedIn (ChosenTopic <-> Student)
CREATE TABLE InterestedIn (
    chosen_topic_id UUID PRIMARY KEY,
    student_code StudentCode NOT NULL
);

-- LabelContentWith (Topic <-> CourseContent)
CREATE TABLE LabelContentWith (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL,
    course_content_id UUID NOT NULL
);

-- LabelCourseWith (Topic <-> Course)
CREATE TABLE LabelCourseWith (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL,
    course_id UUID NOT NULL
);

-- LogContentProgressAt (CourseContent <-> ContentProgress)
CREATE TABLE LogContentProgressAt (
    course_content_id UUID NOT NULL,
    content_progress_id UUID PRIMARY KEY
);

-- LogCourseProgressAt (Course <-> CourseProgress)
CREATE TABLE LogCourseProgressAt (
    course_id UUID NOT NULL,
    course_progress_id UUID PRIMARY KEY
);

-- OwnCourseBy (Course <-> CopyrightOwner)
CREATE TABLE OwnCourseBy (
    course_id UUID NOT NULL,
    copyright_owner_id UUID PRIMARY KEY
);