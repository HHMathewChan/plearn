-- Join Tables

CREATE TABLE HasStudentProfileIn (
    student_code StudentCode NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (student_code, user_id),
    FOREIGN KEY (student_code) REFERENCES Student(student_code),
    FOREIGN KEY (user_id) REFERENCES "User"(id)
);

CREATE TABLE KeepCourseProgressWith (
    course_progress_id INT NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (course_progress_id, student_code),
    FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id),
    FOREIGN KEY (student_code) REFERENCES Student(student_code)
);

CREATE TABLE KeepContentProgressWith (
    content_progress_id INT NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (content_progress_id, student_code),
    FOREIGN KEY (content_progress_id) REFERENCES ContentProgress(id),
    FOREIGN KEY (student_code) REFERENCES Student(student_code)
);

CREATE TABLE LogCourseProgressAt (
    course_id INT NOT NULL,
    course_progress_id INT NOT NULL,
    PRIMARY KEY (course_id, course_progress_id),
    FOREIGN KEY (course_id) REFERENCES Course(id),
    FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id)
);

CREATE TABLE ChooseLearningModeWith (
    learning_mode_id INT NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (learning_mode_id, student_code),
    FOREIGN KEY (learning_mode_id) REFERENCES LearningMode(id),
    FOREIGN KEY (student_code) REFERENCES Student(student_code)
);

CREATE TABLE InterestedIn (
    chosen_topic_id INT NOT NULL,
    student_code StudentCode NOT NULL,
    PRIMARY KEY (chosen_topic_id, student_code),
    FOREIGN KEY (chosen_topic_id) REFERENCES ChosenTopic(id),
    FOREIGN KEY (student_code) REFERENCES Student(student_code)
);

CREATE TABLE LogContentProgressAt (
    course_content_id INT NOT NULL,
    content_progress_id INT NOT NULL,
    PRIMARY KEY (course_content_id, content_progress_id),
    FOREIGN KEY (course_content_id) REFERENCES CourseContent(id),
    FOREIGN KEY (content_progress_id) REFERENCES ContentProgress(id)
);

CREATE TABLE HasTopicReferenceTo (
    chosen_topic_id INT NOT NULL,
    topic_id INT NOT NULL,
    PRIMARY KEY (chosen_topic_id, topic_id),
    FOREIGN KEY (chosen_topic_id) REFERENCES ChosenTopic(id),
    FOREIGN KEY (topic_id) REFERENCES Topic(id)
);

CREATE TABLE RelateContentAround (
    id SERIAL PRIMARY KEY,
    topic_id INT NOT NULL,
    course_content_id INT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES Topic(id),
    FOREIGN KEY (course_content_id) REFERENCES CourseContent(id)
);

CREATE TABLE EnrolsIn (
    student_code StudentCode NOT NULL,
    enrolment_id INT NOT NULL,
    PRIMARY KEY (student_code, enrolment_id),
    FOREIGN KEY (student_code) REFERENCES Student(student_code),
    FOREIGN KEY (enrolment_id) REFERENCES Enrolment(id)
);

CREATE TABLE RelateCourseAround (
    id SERIAL PRIMARY KEY,
    topic_id INT NOT NULL,
    enrolment_id INT NOT NULL,
    UNIQUE (topic_id, enrolment_id),
    FOREIGN KEY (topic_id) REFERENCES Topic(id),
    FOREIGN KEY (enrolment_id) REFERENCES Enrolment(id)
);

CREATE TABLE HasCourseReferenceTo (
    course_id INT NOT NULL,
    course_progress_id INT NOT NULL,
    PRIMARY KEY (course_id, course_progress_id),
    FOREIGN KEY (course_id) REFERENCES Course(id),
    FOREIGN KEY (course_progress_id) REFERENCES CourseProgress(id)
);

CREATE TABLE Comprises (
    course_id INT NOT NULL,
    course_content_id INT NOT NULL,
    PRIMARY KEY (course_id, course_content_id),
    FOREIGN KEY (course_id) REFERENCES Course(id),
    FOREIGN KEY (course_content_id) REFERENCES CourseContent(id)
);

CREATE TABLE HasCopyrightFor (
    course_id INT NOT NULL,
    copyright_owner_id INT NOT NULL,
    PRIMARY KEY (course_id, copyright_owner_id),
    FOREIGN KEY (course_id) REFERENCES Course(id),
    FOREIGN KEY (copyright_owner_id) REFERENCES CopyrightOwner(id)
);