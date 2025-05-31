CREATE TABLE User (
    id SERIAL PRIMARY KEY,
    name PersonNames NOT NULL,
    email EmailAddress NOT NULL UNIQUE,
    password_hash PasswordHash NOT NULL,
    role UserRole NOT NULL,
    registered_at TIMESTAMP NOT NULL
);

CREATE TABLE Student (
    student_code StudentCode PRIMARY KEY
);

CREATE TABLE Course (
    id SERIAL PRIMARY KEY,
    course_code CourseCode NOT NULL UNIQUE,
    title CourseTitle NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE Enrolment (
    id SERIAL PRIMARY KEY,
    enrolment_code EnrolmentCode NOT NULL UNIQUE,
    student_id StudentCode NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP NOT NULL
);

CREATE TABLE CourseContent (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    title ContentTitle NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_url URL NOT NULL UNIQUE
);

CREATE TABLE CourseProgress (
    id SERIAL PRIMARY KEY,
    student_id StudentCode NOT NULL,
    course_id INT NOT NULL,
    status ProgressStatus NOT NULL,
    date_completed DATE,
    last_updated TIMESTAMP NOT NULL
);

CREATE TABLE ContentProgress (
    id SERIAL PRIMARY KEY,
    student_id StudentCode NOT NULL,
    content_id INT NOT NULL,
    status ProgressStatus NOT NULL,
    date_completed DATE,
    last_updated TIMESTAMP NOT NULL
);

CREATE TABLE LearningMode (
    id SERIAL PRIMARY KEY,
    mode_name ModeName NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE CopyrightOwner (
    id SERIAL PRIMARY KEY,
    name CopyrightOwnerNames NOT NULL,
    type CopyrightOwnerType NOT NULL,
    contact_email EmailAddress,
    license_type LicenseType NOT NULL,
    license_url URL
);

CREATE TABLE Topic (
    id SERIAL PRIMARY KEY,
    name TopicName NOT NULL
);

CREATE TABLE ChosenTopic (
    id SERIAL PRIMARY KEY,
    interest_level InterestLevel NOT NULL,
    knowledge_proficiency KnowledgeProficiency NOT NULL,
    student_id StudentCode NOT NULL,
    topic_id INT NOT NULL
);