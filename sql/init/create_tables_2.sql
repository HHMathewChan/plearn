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

-- HasCourseReferenceTo (Course <-> Enrolment)
CREATE TABLE HasCourseReferenceTo (
    enrolment_id UUID PRIMARY KEY,
    course_id UUID NOT NULL
);

-- HasFinalQuizFor (FinalQuiz <-> Course)
CREATE TABLE HasFinalQuizFor (
    final_quiz_id UUID PRIMARY KEY,
    course_id UUID NOT NULL
);

-- HasLearningModeFor (Student <-> LearningMode)
CREATE TABLE HasLearningModeFor (
    learning_mode_id UUID NOT NULL,
    student_code StudentCode PRIMARY KEY
);

-- HasQuestionFor (Question <-> FinalQuiz)
CREATE TABLE HasQuestionFor (
    question_id UUID PRIMARY KEY,
    final_quiz_id UUID NOT NULL
);

-- HasQuestionOptionFor (Question <-> QuestionOption)
CREATE TABLE HasQuestionOptionFor (
    question_option_id UUID PRIMARY KEY,
    question_id UUID NOT NULL
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

-- LogActiveAttemptForStudentAt (QuizAttempt <-> Student)
CREATE TABLE LogActiveAttemptForStudentAt (
    quiz_attempt_id UUID UNIQUE NOT NULL,
    student_code StudentCode PRIMARY KEY
);

-- LogAnswerForAttemptWith (QuizAttempt <-> StudentAnswer)
CREATE TABLE LogAnswerForAttemptWith (
    quiz_attempt_id UUID NOT NULL,
    student_answer_id UUID PRIMARY KEY
);

-- LogAnswerForQuestionWith (Question <-> StudentAnswer)
CREATE TABLE LogAnswerForQuestionWith (
    question_id UUID NOT NULL,
    student_answer_id UUID PRIMARY KEY
);

--LogActiveAttemptForFinalQuizWith (FinalQuiz <-> QuizAttempt)
-- final_quiz_id is unique as there can be only one active attempt for a final quiz
CREATE TABLE LogActiveAttemptForFinalQuizWith (
    final_quiz_id UUID UNIQUE NOT NULL,
    quiz_attempt_id UUID PRIMARY KEY
);

--LogPastAttemptForStudentAt (QuizAttempt <-> Student)
CREATE TABLE LogPastAttemptForStudentAt (
    quiz_attempt_id UUID PRIMARY KEY,
    student_code StudentCode NOT NULL
);

--LogPastAttemptForFinalQuizWith (FinalQuiz <-> QuizAttempt)
CREATE TABLE LogPastAttemptForFinalQuizWith (
    final_quiz_id UUID NOT NULL,
    quiz_attempt_id UUID PRIMARY KEY
);