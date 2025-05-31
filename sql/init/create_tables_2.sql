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

-- Add foreign keys
ALTER TABLE HasStudentProfileIn
    ADD CONSTRAINT fk_hspi_student FOREIGN KEY (student_code) REFERENCES Student(student_code),
    ADD CONSTRAINT fk_hspi_user FOREIGN KEY (user_id) REFERENCES "User"(id);

ALTER TABLE KeepCourseProgressWith
    ADD CONSTRAINT fk_kcpw_course_progress FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id),
    ADD CONSTRAINT fk_kcpw_student FOREIGN KEY (student_code) REFERENCES Student(student_code);

ALTER TABLE KeepContentProgressWith
    ADD CONSTRAINT fk_kcpw_content_progress FOREIGN KEY (content_progress_id) REFERENCES ContentProgress(id),
    ADD CONSTRAINT fk_kcpw_student FOREIGN KEY (student_code) REFERENCES Student(student_code);

ALTER TABLE LogCourseProgressAt
    ADD CONSTRAINT fk_lcpa_course FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD CONSTRAINT fk_lcpa_course_progress FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id);

ALTER TABLE ChooseLearningModeWith
    ADD CONSTRAINT fk_clmw_learning_mode FOREIGN KEY (learning_mode_id) REFERENCES LearningMode(id),
    ADD CONSTRAINT fk_clmw_student FOREIGN KEY (student_code) REFERENCES Student(student_code);

ALTER TABLE InterestedIn
    ADD CONSTRAINT fk_ii_chosen_topic FOREIGN KEY (chosen_topic_id) REFERENCES ChosenTopic(id),
    ADD CONSTRAINT fk_ii_student FOREIGN KEY (student_code) REFERENCES Student(student_code);

ALTER TABLE LogContentProgressAt
    ADD CONSTRAINT fk_lcpa_course_content FOREIGN KEY (course_content_id) REFERENCES CourseContent(id),
    ADD CONSTRAINT fk_lcpa_content_progress FOREIGN KEY (content_progress_id) REFERENCES ContentProgress(id);

ALTER TABLE HasTopicReferenceTo
    ADD CONSTRAINT fk_htrt_chosen_topic FOREIGN KEY (chosen_topic_id) REFERENCES ChosenTopic(id),
    ADD CONSTRAINT fk_htrt_topic FOREIGN KEY (topic_id) REFERENCES Topic(id);

ALTER TABLE RelateContentAround
    ADD CONSTRAINT fk_rca_topic FOREIGN KEY (topic_id) REFERENCES Topic(id),
    ADD CONSTRAINT fk_rca_course_content FOREIGN KEY (course_content_id) REFERENCES CourseContent(id);

ALTER TABLE EnrolsIn
    ADD CONSTRAINT fk_ei_student FOREIGN KEY (student_code) REFERENCES Student(student_code),
    ADD CONSTRAINT fk_ei_enrolment FOREIGN KEY (enrolment_id) REFERENCES Enrolment(id);

ALTER TABLE RelateCourseAround
    ADD CONSTRAINT fk_rca_topic FOREIGN KEY (topic_id) REFERENCES Topic(id),
    ADD CONSTRAINT fk_rca_enrolment FOREIGN KEY (enrolment_id) REFERENCES Enrolment(id);

ALTER TABLE HasCourseReferenceTo
    ADD CONSTRAINT fk_hcrt_course FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD CONSTRAINT fk_hcrt_course_progress FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id);

ALTER TABLE Comprises
    ADD CONSTRAINT fk_c_course FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD CONSTRAINT fk_c_course_content FOREIGN KEY (course_content_id) REFERENCES CourseContent(id);

ALTER TABLE HasCopyrightFor
    ADD CONSTRAINT fk_hcf_course FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD CONSTRAINT fk_hcf_copyright_owner FOREIGN KEY (copyright_owner_id) REFERENCES CopyrightOwner(id);