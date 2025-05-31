-- Constraints for create_table_2.sql
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