CREATE TABLE ChosenTopic (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interest_level InterestLevel NOT NULL,
    knowledge_proficiency KnowledgeProficiency NOT NULL,
    student_code StudentCode NOT NULL,
    topic_id UUID NOT NULL
);

CREATE TABLE ContentProgress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL,
    status ProgressStatus NOT NULL,
    date_completed TIMESTAMP,
    last_updated TIMESTAMP NOT NULL
);

CREATE TABLE CopyrightOwner (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name CopyrightOwnerNames NOT NULL,
    type CopyrightOwnerType NOT NULL,
    contact_email EmailAddress,
    license_type LicenseType NOT NULL,
    license_url URLPath
);

CREATE TABLE Course (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code CourseCode NOT NULL UNIQUE,
    title CourseTitle NOT NULL,
    description TEXT
);

CREATE TABLE CourseContent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL,
    title ContentTitle NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_url URLPath NOT NULL UNIQUE
);

CREATE TABLE CourseProgress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_code StudentCode NOT NULL,
    course_id UUID NOT NULL,
    status ProgressStatus NOT NULL,
    date_completed TIMESTAMP,
    last_updated TIMESTAMP NOT NULL
);

CREATE TABLE Enrolment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrolment_code EnrolmentCode NOT NULL UNIQUE,
    student_code StudentCode NOT NULL,
    course_id UUID NOT NULL,
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE FinalQuiz (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title ContentTitle NOT NULL
);

CREATE TABLE PlatformUser (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name PersonNames NOT NULL,
    email EmailAddress NOT NULL UNIQUE,
    password_hash PasswordHash NOT NULL,
    role UserRole NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Question (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_text TEXT NOT NULL,
    correct_option_id UUID NOT NULL,
    difficulty QuestionDifficulty NOT NULL
);

CREATE TABLE QuestionOption (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID,
    option_text TEXT NOT NULL
);

CREATE TABLE LearningMode (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mode_name ModeName NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE Student (
    student_code StudentCode PRIMARY KEY
);

CREATE TABLE Topic (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TopicName NOT NULL
);