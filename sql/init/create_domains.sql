-- DOMAIN: ContentTitle
CREATE DOMAIN ContentTitle AS VARCHAR(150);

-- DOMAIN: ContentType
CREATE DOMAIN content_type_domain AS TEXT
  CHECK (VALUE IN (
    'video',
    'text',
    'pdf',
    'link',
    'interactive'
  ));

-- DOMAIN: CopyrightOwnerNames
CREATE DOMAIN CopyrightOwnerNames AS VARCHAR(255)
CHECK (VALUE ~ '^[A-Za-z ]+$');

-- DOMAIN: CopyrightOwnerType
CREATE DOMAIN CopyrightOwnerType AS TEXT
CHECK (VALUE IN ('individual', 'institution', 'third_party'));

-- DOMAIN: CourseCode
CREATE DOMAIN CourseCode AS VARCHAR(20)
CHECK (VALUE ~ '^CRS-[A-Z]{2,5}[0-9]{3}$');

-- DOMAIN: CourseTitle
CREATE DOMAIN CourseTitle AS VARCHAR(150);

-- DOMAIN: EmailAddress
CREATE DOMAIN EmailAddress AS VARCHAR(255)
CHECK (VALUE ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- DOMAIN: EnrolmentCode
CREATE DOMAIN EnrolmentCode AS VARCHAR(20)
CHECK (VALUE ~ '^ENR[0-9]{4}[0-9]+$');

-- DOMAIN: InterestLevel
CREATE DOMAIN InterestLevel AS TEXT
CHECK (VALUE IN ('low', 'medium', 'high'));

-- DOMAIN: KnowledgeProficiency
CREATE DOMAIN KnowledgeProficiency AS TEXT
CHECK (VALUE IN ('novice', 'intermediate', 'proficient'));

-- DOMAIN: LicenseType
CREATE DOMAIN LicenseType AS TEXT
CHECK (VALUE IN ('OER', 'CC', 'proprietary'));

-- DOMAIN: ModeName
CREATE DOMAIN ModeName AS TEXT
CHECK (VALUE IN ('beginner', 'intermediate', 'challenging'));

-- DOMAIN: PasswordHash
CREATE DOMAIN PasswordHash AS TEXT;

-- DOMAIN: PersonNames
CREATE DOMAIN PersonNames AS VARCHAR(100)
CHECK (VALUE ~ '^[A-Za-z][A-Za-z ]*$');

-- DOMAIN: ProgressStatus
CREATE DOMAIN ProgressStatus AS TEXT
CHECK (VALUE IN ('not_started', 'in_progress', 'completed'));

-- DOMAIN: StudentCode
CREATE DOMAIN StudentCode AS VARCHAR(20)
CHECK (VALUE ~ '^STR[0-9]{4}[0-9]+$');

-- DOMAIN: TopicName
CREATE DOMAIN TopicName AS TEXT;

-- DOMAIN: URLPath
CREATE DOMAIN URLPath AS TEXT
CHECK (VALUE ~ '^https?:\/\/');

-- DOMAIN: UserRole
CREATE DOMAIN UserRole AS TEXT
CHECK (VALUE IN ('student', 'tutor', 'admin'));