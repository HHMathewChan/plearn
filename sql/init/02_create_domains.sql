-- DOMAIN: CourseCode
CREATE DOMAIN CourseCode AS VARCHAR(20)
CHECK (VALUE ~ '^CRS-[A-Z]{2,5}[0-9]{3}$');

-- DOMAIN: EnrolmentCode
CREATE DOMAIN EnrolmentCode AS VARCHAR(20)
CHECK (VALUE ~ '^ENR-[0-9]{4}-[0-9]{4}$');

-- DOMAIN: PersonNames
CREATE DOMAIN PersonNames AS VARCHAR(100)
CHECK (VALUE ~ '^[A-Za-z ]+$');

-- DOMAIN: EmailAddress
CREATE DOMAIN EmailAddress AS VARCHAR(255)
CHECK (VALUE ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- DOMAIN: PasswordHash
CREATE DOMAIN PasswordHash AS TEXT;

-- DOMAIN: LicenseType
CREATE DOMAIN LicenseType AS VARCHAR(20)
CHECK (VALUE IN ('OER', 'CC', 'proprietary'));

-- DOMAIN: CopyrightOwnerType
CREATE DOMAIN CopyrightOwnerType AS VARCHAR(20)
CHECK (VALUE IN ('individual', 'institution', 'third_party'));

-- DOMAIN: ModeName
CREATE DOMAIN ModeName AS VARCHAR(20)
CHECK (VALUE IN ('Beginner', 'Intermediate', 'Challenging'));

-- DOMAIN: TopicName
CREATE DOMAIN TopicName AS TEXT;

-- DOMAIN: CourseTitle
CREATE DOMAIN CourseTitle AS VARCHAR(150);

-- DOMAIN: ContentTitle
CREATE DOMAIN ContentTitle AS VARCHAR(150);

-- DOMAIN: ProgressStatus
CREATE DOMAIN ProgressStatus AS VARCHAR(20)
CHECK (VALUE IN ('not_started', 'in_progress', 'completed'));

-- DOMAIN: UserRole
CREATE DOMAIN UserRole AS VARCHAR(20)
CHECK (VALUE IN ('student', 'tutor', 'admin'));

-- DOMAIN: URL
CREATE DOMAIN URL AS TEXT
CHECK (VALUE ~ '^https?:\/\/');

-- DOMAIN: TimestampNotNull
CREATE DOMAIN TimestampNotNull AS TIMESTAMP NOT NULL;