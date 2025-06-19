-- Seed script for Plearn database

-- PlatformUser
INSERT INTO platformuser (id, name, email, password_hash, role, registered_at) VALUES
('b3b1c7e2-1111-4e1a-9c1a-111111111111', 'Alice Smith', 'alice@example.com', 'hashed_pw_1', 'student', NOW()),
('b3b1c7e2-2222-4e1a-9c1a-222222222222', 'Bob Tutor', 'bob@example.com', 'hashed_pw_2', 'tutor', NOW());

-- Student
INSERT INTO student (student_code) VALUES
('STR20251'),
('STR20252');

-- Topic
INSERT INTO topic (id, name) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 'JavaScript'),
('b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb', 'Python');

-- ChosenTopic
INSERT INTO chosentopic (id, interest_level, knowledge_proficiency, student_id, topic_id) VALUES
('b3b1c7e2-cccc-4e1a-9c1a-cccccccccccc', 'high', 'novice', 'STR20251', 'b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa'),
('b3b1c7e2-dddd-4e1a-9c1a-dddddddddddd', 'medium', 'intermediate', 'STR20251', 'b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb');

-- LearningMode
INSERT INTO learningmode (id, mode_name, description) VALUES
('b3b1c7e2-eeee-4e1a-9c1a-eeeeeeeeeeee', 'beginner', 'Focuses on basic concepts and fundamentals.'),
('b3b1c7e2-ffff-4e1a-9c1a-ffffffffffff', 'intermediate', 'Covers moderate complexity topics.');

-- Course
INSERT INTO course (id, course_code, title, description) VALUES
('b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', 'CRS-JS101', 'JavaScript Fundamentals - Level 1', 'Introductory JavaScript course'),
('b3b1c7e2-2222-4e1a-9c1a-bbbb22222222', 'CRS-PY101', 'Python for Beginners', 'Learn Python from scratch');

-- Enrolment
INSERT INTO enrolment (id, enrolment_code, student_code, course_id, enrolled_at) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'ENR20251', 'STR20251', 'b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', NOW());

-- CourseContent
INSERT INTO coursecontent (id, course_id, title, content_type, content_url) VALUES
('b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', 'Intro to JS', 'video', 'https://example.com/js-intro'),
('b3b1c7e2-5555-4e1a-9c1a-eeee55555555', 'b3b1c7e2-2222-4e1a-9c1a-bbbb22222222', 'Python Basics', 'text', 'https://example.com/py-basics');

-- CourseProgress
INSERT INTO courseprogress (id, student_id, course_id, status, date_completed, last_updated) VALUES
('b3b1c7e2-6666-4e1a-9c1a-ffff66666666', 'b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', 'b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', 'in_progress', NULL, NOW());

-- ContentProgress
INSERT INTO contentprogress (id, student_id, content_id, status, date_completed, last_updated) VALUES
('b3b1c7e2-7777-4e1a-9c1a-aaaa77777777', 'b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', 'b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'completed', NOW(), NOW());

-- CopyrightOwner
INSERT INTO copyrightowner (id, name, type, contact_email, license_type, license_url) VALUES
('b3b1c7e2-8888-4e1a-9c1a-bbbb88888888', 'OpenCourseWare', 'institution', 'info@ocw.org', 'OER', 'https://ocw.org/license');
-- Additional CopyrightOwner examples
INSERT INTO copyrightowner (id, name, type, contact_email, license_type, license_url) VALUES
('b3b1c7e2-9999-4e1a-9c1a-cccc99999999', 'Creative Commons Foundation', 'institution', 'info@creativecommons.org', 'CC', 'https://creativecommons.org/licenses/by-sa/4.0/'),
('b3b1c7e2-aaaa-4e1a-9c1a-ddddaaaaaaaa', 'MIT OpenCourseWare', 'institution', 'ocw-help@mit.edu', 'CC', 'https://ocw.mit.edu/terms/'),
('b3b1c7e2-bbbb-4e1a-9c1a-eeeebbbbbbbb', 'Khan Academy', 'institution', 'content@khanacademy.org', 'CC', 'https://www.khanacademy.org/about/tos#cc-license'),
('b3b1c7e2-cccc-4e1a-9c1a-ffffcccccccc', 'FreeCodeCamp', 'institution', 'team@freecodecamp.org', 'CC', 'https://github.com/freeCodeCamp/freeCodeCamp/blob/main/LICENSE.md');

-- OwnCourseBy
INSERT INTO owncourseby (course_id, copyright_owner_id) VALUES
('b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', 'b3b1c7e2-8888-4e1a-9c1a-bbbb88888888'),
('b3b1c7e2-2222-4e1a-9c1a-bbbb22222222', 'b3b1c7e2-9999-4e1a-9c1a-cccc99999999');

--hasStudentProfileIn
INSERT INTO hasstudentprofilein (student_code, platform_user_id) VALUES
('STR20251', 'b3b1c7e2-1111-4e1a-9c1a-111111111111'),
('STR20252', 'b3b1c7e2-2222-4e1a-9c1a-222222222222');