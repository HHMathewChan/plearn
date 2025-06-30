-- Seed script for Plearn database

-- PlatformUser
INSERT INTO platformuser (id, name, email, password_hash, role, registered_at) VALUES
('b3b1c7e2-1111-4e1a-9c1a-111111111111', 'Alice Smith', 'alice@example.com', 'hashed_pw_1', 'student', NOW());
-- ('b3b1c7e2-2222-4e1a-9c1a-222222222222', 'Bob Tutor', 'bob@example.com', 'hashed_pw_2', 'tutor', NOW());

-- Student
INSERT INTO student (student_code) VALUES
('STR20251');

-- Topic
-- INSERT INTO topic (id, name) VALUES
-- ('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 'JavaScript'),
-- ('b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb', 'Python');

-- ChosenTopic
-- INSERT INTO chosentopic (id, interest_level, knowledge_proficiency, student_id, topic_id) VALUES
-- ('b3b1c7e2-cccc-4e1a-9c1a-cccccccccccc', 'high', 'novice', 'STR20251', 'b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa'),
-- ('b3b1c7e2-dddd-4e1a-9c1a-dddddddddddd', 'medium', 'intermediate', 'STR20251', 'b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb');

-- LearningMode
-- INSERT INTO learningmode (id, mode_name, description) VALUES
-- ('b3b1c7e2-eeee-4e1a-9c1a-eeeeeeeeeeee', 'beginner', 'Focuses on basic concepts and fundamentals.'),
-- ('b3b1c7e2-ffff-4e1a-9c1a-ffffffffffff', 'intermediate', 'Covers moderate complexity topics.');

-- Course
INSERT INTO course (id, course_code, title, description) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'CRS1', 'Introduction to Nuclear Engineering and Ionizing Radiation', 'This course provides an introduction to nuclear science and its engineering applications. It describes basic nuclear models, radioactivity, nuclear reactions, and kinematics; covers the interaction of ionizing radiation with matter, with an emphasis on radiation detection, radiation shielding, and radiation effects on human health; and presents energy systems based on fission and fusion nuclear reactions, as well as industrial and medical applications of nuclear science.'),
('b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'CRS2', 'Energy Economics', 'This course explores the theoretical and empirical perspectives on individual and industrial demand for energy, energy supply, energy markets, and public policies affecting energy markets. It discusses aspects of the oil, natural gas, electricity, and nuclear power sectors and examines energy tax, price regulation, deregulation, energy efficiency and policies for controlling emission.');

-- Enrolment
INSERT INTO enrolment (id, enrolment_code, student_code, course_id, enrolled_at) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'ENR20251', 'STR20251', 'b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', NOW());

-- CourseContent
INSERT INTO coursecontent (id, course_id, title, content_type, content_url) VALUES
('b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'b3b1c7e2-3333-4e1a-9c1a-cccc33333333', '22.01 Spring 2024 Lecture 01: Radiation History to the Present', 'pdf', '/Users/mathewchan/plearn/backend/courseResources/CRS1/mit22_01_s24_radiation_history.pdf'),
('b3b1c7e2-5555-4e1a-9c1a-eeee55555555', 'b3b1c7e2-3333-4e1a-9c1a-cccc33333333', '22.01 Spring 2024 Lecture 02: Radiation-Utilizing Technology Overview', 'pdf', '/Users/mathewchan/plearn/backend/courseResources/CRS1/mit22_01_s24_radiation_utilizing_tech.pdf');

-- CopyrightOwner
INSERT INTO copyrightowner (id, name, type, contact_email, license_type, license_url) VALUES
('b3b1c7e2-8888-4e1a-9c1a-bbbb88888888', 'OpenCourseWare', 'institution', 'info@ocw.org', 'OER', 'https://ocw.org/license'),
('b3b1c7e2-9999-4e1a-9c1a-cccc99999999', 'Creative Commons Foundation', 'institution', 'contact@creativecommons.org', 'CC', 'https://creativecommons.org/licenses/by-sa/4.0/');


-- OwnCourseBy
INSERT INTO owncourseby (course_id, copyright_owner_id) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'b3b1c7e2-8888-4e1a-9c1a-bbbb88888888'),
('b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'b3b1c7e2-9999-4e1a-9c1a-cccc99999999');

--hasStudentProfileIn
INSERT INTO hasstudentprofilein (student_code, platform_user_id) VALUES
('STR20251', 'b3b1c7e2-1111-4e1a-9c1a-111111111111');