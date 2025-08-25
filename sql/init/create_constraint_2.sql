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

-- HasFinalQuizFor
ALTER TABLE HasFinalQuizFor
    ADD FOREIGN KEY (final_quiz_id) REFERENCES FinalQuiz(id),
    ADD FOREIGN KEY (course_id) REFERENCES Course(id);

-- HasLearningModeFor
ALTER TABLE HasLearningModeFor
    ADD FOREIGN KEY (learning_mode_id) REFERENCES LearningMode(id),
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code);

-- HasQuestionFor
ALTER TABLE HasQuestionFor
    ADD FOREIGN KEY (question_id) REFERENCES Question(id),
    ADD FOREIGN KEY (question_option_id) REFERENCES QuestionOption(id);

-- HasQuestionOptionFor
ALTER TABLE HasQuestionOptionFor
    ADD FOREIGN KEY (question_option_id) REFERENCES QuestionOption(id),
    ADD FOREIGN KEY (question_id) REFERENCES Question(id);

-- HasStudentProfileIn
ALTER TABLE HasStudentProfileIn
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code),
    ADD FOREIGN KEY (platform_user_id) REFERENCES PlatformUser(id);

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
    ADD FOREIGN KEY (course_content_id) REFERENCES CourseContent(id),
    ADD UNIQUE (topic_id, course_content_id);

-- LabelCourseWith
ALTER TABLE LabelCourseWith
    ADD FOREIGN KEY (topic_id) REFERENCES Topic(id),
    ADD FOREIGN KEY (course_id) REFERENCES Course(id),
    ADD UNIQUE (topic_id, course_id);

-- LogAnswerForAttemptWith
ALTER TABLE LogAnswerForAttemptWith
    ADD FOREIGN KEY (quiz_attempt_id) REFERENCES QuizAttempt(id),
    ADD FOREIGN KEY (student_answer_id) REFERENCES StudentAnswer(id);

-- LogAnswerForQuestionWith
ALTER TABLE LogAnswerForQuestionWith
    ADD FOREIGN KEY (question_id) REFERENCES Question(id),
    ADD FOREIGN KEY (student_answer_id) REFERENCES StudentAnswer(id);

--LogActiveAttemptForFinalQuizWith
ALTER TABLE LogActiveAttemptForFinalQuizWith
    ADD FOREIGN KEY (final_quiz_id) REFERENCES FinalQuiz(id),
    ADD FOREIGN KEY (quiz_attempt_id) REFERENCES QuizAttempt(id);

--LogPastAttemptForFinalQuizWith
ALTER TABLE LogPastAttemptForFinalQuizWith
    ADD FOREIGN KEY (final_quiz_id) REFERENCES FinalQuiz(id),
    ADD FOREIGN KEY (quiz_attempt_id) REFERENCES QuizAttempt(id);

--LogActiveAttemptForStudentAt
ALTER TABLE LogActiveAttemptForStudentAt
    ADD FOREIGN KEY (quiz_attempt_id) REFERENCES QuizAttempt(id),
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code);

--LogPastAttemptForStudentAt
ALTER TABLE LogPastAttemptForStudentAt
    ADD FOREIGN KEY (quiz_attempt_id) REFERENCES QuizAttempt(id),
    ADD FOREIGN KEY (student_code) REFERENCES Student(student_code);