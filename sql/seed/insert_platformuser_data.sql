-- Seed script for Plearn database

-- PlatformUser
INSERT INTO platformuser (id, name, email, password_hash, role, registered_at) VALUES
('b3b1c7e2-1111-4e1a-9c1a-111111111111', 'Alice Smith', 'alice@example.com', 'hashed_pw_1', 'student', NOW()),
('b3b1c7e2-2222-4e1a-9c1a-222222222222', 'Dummy', 'dummy@example.com', 'hashed_pw_2', 'student', NOW());

-- Student
INSERT INTO student (student_code) VALUES
('STR20251'),
('STR20252');

-- ChosenTopic
-- INSERT INTO chosentopic (id, interest_level, knowledge_proficiency, student_code, topic_id) VALUES
-- ('b3b1c7e2-cccc-4e1a-9c1a-cccccccccccc', 'high', 'novice', 'STR20251', 'b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa'),
-- ('b3b1c7e2-dddd-4e1a-9c1a-dddddddddddd', 'medium', 'intermediate', 'STR20251', 'b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb');

-- LearningMode
-- INSERT INTO learningmode (id, mode_name, description) VALUES
-- ('b3b1c7e2-eeee-4e1a-9c1a-eeeeeeeeeeee', 'beginner', 'Focuses on basic concepts and fundamentals.'),
-- ('b3b1c7e2-ffff-4e1a-9c1a-ffffffffffff', 'intermediate', 'Covers moderate complexity topics.');

-- Enrolment
INSERT INTO enrolment (id, enrolment_code, student_code, course_id, enrolled_at) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'ENR20251', 'STR20251', 'b3b1c7e2-1111-4e1a-9c1a-aaaa11111111', NOW());

--hasStudentProfileIn
INSERT INTO hasstudentprofilein (student_code, platform_user_id) VALUES
('STR20251', 'b3b1c7e2-1111-4e1a-9c1a-111111111111'),
('STR20252', 'b3b1c7e2-2222-4e1a-9c1a-222222222222');
