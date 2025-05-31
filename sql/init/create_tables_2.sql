-- Join Tables

CREATE TABLE HasStudentProfileIn (
    student_code StudentCode NOT NULL,
    user_id UUID NOT NULL,
    PRIMARY KEY (student_code, user_id)
);

CREATE TABLE KeepCourseProgressWith (
    course_progress_id UUID NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (course_progress_id, student_code)
);

CREATE TABLE KeepContentProgressWith (
    content_progress_id UUID NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (content_progress_id, student_code)
);

CREATE TABLE LogCourseProgressAt (
    course_id UUID NOT NULL,
    course_progress_id UUID NOT NULL,
    PRIMARY KEY (course_id, course_progress_id)
);

CREATE TABLE ChooseLearningModeWith (
    learning_mode_id UUID NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (learning_mode_id, student_code)
);

CREATE TABLE InterestedIn (
    chosen_topic_id UUID NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (chosen_topic_id, student_code)
);

CREATE TABLE LogContentProgressAt (
    course_content_id UUID NOT NULL,
    content_progress_id UUID NOT NULL,
    PRIMARY KEY (course_content_id, content_progress_id)
);

CREATE TABLE HasTopicReferenceTo (
    chosen_topic_id UUID NOT NULL,
    topic_id UUID NOT NULL,
    PRIMARY KEY (chosen_topic_id, topic_id)
);

CREATE TABLE RelateContentAround (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL,
    course_content_id UUID NOT NULL
);

CREATE TABLE EnrolsIn (
    student_code StudentCode NOT NULL,
    enrolment_id UUID NOT NULL,
    PRIMARY KEY (student_code, enrolment_id)
);

CREATE TABLE RelateCourseAround (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL,
    enrolment_id UUID NOT NULL,
    UNIQUE (topic_id, enrolment_id)
);

CREATE TABLE HasCourseReferenceTo (
    course_id UUID NOT NULL,
    course_progress_id UUID NOT NULL,
    PRIMARY KEY (course_id, course_progress_id)
);

CREATE TABLE Comprises (
    course_id UUID NOT NULL,
    course_content_id UUID NOT NULL,
    PRIMARY KEY (course_id, course_content_id)
);

CREATE TABLE HasCopyrightFor (
    course_id UUID NOT NULL,
    copyright_owner_id UUID NOT NULL,
    PRIMARY KEY (course_id, copyright_owner_id)
);