-- Comprises
ALTER TABLE Comprises
    ADD FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD FOREIGN KEY (course_content_id) REFERENCES CourseContent(id);

-- EnrolsIn
ALTER TABLE EnrolsIn
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code),
    ADD FOREIGN KEY (enrolment_id) REFERENCES Enrolment(id);

-- HasCourseReferenceTo
ALTER TABLE HasCourseReferenceTo
    ADD FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id);

-- HasLearningModeFor
ALTER TABLE HasLearningModeFor
    ADD FOREIGN KEY (learning_mode_id) REFERENCES LearningMode(id),
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code);

-- HasStudentProfileIn
ALTER TABLE HasStudentProfileIn
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code),
    ADD FOREIGN KEY (user_id) REFERENCES User(id);

-- HasTopicReferenceTo
ALTER TABLE HasTopicReferenceTo
    ADD FOREIGN KEY (chosen_topic_id) REFERENCES ChosenTopic(id),
    ADD FOREIGN KEY (topic_id) REFERENCES Topic(id);

-- InterestedIn
ALTER TABLE InterestedIn
    ADD FOREIGN KEY (chosen_topic_id) REFERENCES ChosenTopic(id),
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code);

-- HasContentProgressFor
ALTER TABLE HasContentProgressFor
    ADD FOREIGN KEY (content_progress_id) REFERENCES ContentProgress(id),
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code);

-- HasCourseProgressFor
ALTER TABLE HasCourseProgressFor
    ADD FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id),
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code);

-- LogContentProgressAt
ALTER TABLE LogContentProgressAt
    ADD FOREIGN KEY (course_content_id) REFERENCES CourseContent(id),
    ADD FOREIGN KEY (content_progress_id) REFERENCES ContentProgress(id);

-- LogCourseProgressAt
ALTER TABLE LogCourseProgressAt
    ADD FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id);

-- OwnCourseBy
ALTER TABLE OwnCourseBy
    ADD FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD FOREIGN KEY (copyright_owner_id) REFERENCES CopyrightOwner(id);

-- LabelContentWith
ALTER TABLE LabelContentWith
    ADD FOREIGN KEY (topic_id) REFERENCES Topic(id),
    ADD FOREIGN KEY (course_content_id) REFERENCES CourseContent(id);

-- LabelCourseWith
ALTER TABLE LabelCourseWith
    ADD FOREIGN KEY (topic_id) REFERENCES Topic(id),
    ADD FOREIGN KEY (enrolment_id) REFERENCES Enrolment(id);
