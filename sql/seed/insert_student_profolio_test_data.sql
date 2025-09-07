-- The following are for testing the use case for complete a final quiz for STR20251
-- Quiz attempt for STR20251
INSERT INTO quizattempt (id, score, started_at, completed_at, attempt_count, attempt_status, updated_at) VALUES
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', 100, '2025-08-23 01:00:00', '2025-08-23 02:00:00', 1, 'in_progress', '2025-08-23 02:00:00');

-- Log past attempt for student STR20251
INSERT INTO logpastattemptforstudentat (quiz_attempt_id, student_code) VALUES
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', 'STR20251');

-- Log past attempt for final quiz with STR20251
INSERT INTO logpastattemptforfinalquizwith (final_quiz_id, quiz_attempt_id) VALUES
('99999999-0009-4e1a-9c1a-333333333339', 'd00c1f2d-ad92-48b0-8b41-840ed4e26d5a');

-- Insert 9 StudentAnswer records
INSERT INTO studentanswer (id, selected_option_id, is_correct) VALUES
('11111111-aaaa-4e1a-9c1a-aaaaaaaaaaaa', NULL, NULL),
('22222222-bbbb-4e1a-9c1a-bbbbbbbbbbbb', NULL, NULL),
('33333333-cccc-4e1a-9c1a-cccccccccccc', NULL, NULL),
('44444444-dddd-4e1a-9c1a-dddddddddddd', NULL, NULL),
('55555555-eeee-4e1a-9c1a-eeeeeeeeeeee', NULL, NULL),
('66666666-ffff-4e1a-9c1a-ffffffffffff', NULL, NULL),
('77777777-1111-4e1a-9c1a-111111111111', NULL, NULL),
('88888888-2222-4e1a-9c1a-222222222222', NULL, NULL),
('99999999-3333-4e1a-9c1a-333333333333', NULL, NULL);

-- Insert corresponding records into LogAnswerForQuestionWith
INSERT INTO loganswerforquestionwith (question_id, student_answer_id) VALUES
('0cb22227-5b0b-4e88-92db-c182c6cc9c7a', '11111111-aaaa-4e1a-9c1a-aaaaaaaaaaaa'),
('22222222-0002-4e1a-9c1a-bbbbbbbbbbb2', '22222222-bbbb-4e1a-9c1a-bbbbbbbbbbbb'),
('33333333-0003-4e1a-9c1a-ccccccccccc3', '33333333-cccc-4e1a-9c1a-cccccccccccc'),
('44444444-0004-4e1a-9c1a-ddddddddddd4', '44444444-dddd-4e1a-9c1a-dddddddddddd'),
('55555555-0005-4e1a-9c1a-eeeeeeeeeee5', '55555555-eeee-4e1a-9c1a-eeeeeeeeeeee'),
('66666666-0006-4e1a-9c1a-fffffffffff6', '66666666-ffff-4e1a-9c1a-ffffffffffff'),
('77777777-0007-4e1a-9c1a-111111111117', '77777777-1111-4e1a-9c1a-111111111111'),
('88888888-0008-4e1a-9c1a-222222222228', '88888888-2222-4e1a-9c1a-222222222222'),
('99999999-0009-4e1a-9c1a-333333333339', '99999999-3333-4e1a-9c1a-333333333333');

-- Insert corresponding records into LogAnswerForAttemptWith
INSERT INTO loganswerforattemptwith (quiz_attempt_id, student_answer_id) VALUES
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '11111111-aaaa-4e1a-9c1a-aaaaaaaaaaaa'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '22222222-bbbb-4e1a-9c1a-bbbbbbbbbbbb'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '33333333-cccc-4e1a-9c1a-cccccccccccc'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '44444444-dddd-4e1a-9c1a-dddddddddddd'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '55555555-eeee-4e1a-9c1a-eeeeeeeeeeee'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '66666666-ffff-4e1a-9c1a-ffffffffffff'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '77777777-1111-4e1a-9c1a-111111111111'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '88888888-2222-4e1a-9c1a-222222222222'),
('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '99999999-3333-4e1a-9c1a-333333333333');

-- Record related to course progress for STR20251 in course CRS1
INSERT INTO courseprogress (id, student_code, course_id, status, date_completed, last_updated) VALUES
('aaaaaaa1-1111-4e1a-9c1a-aaaaaaaaaaa1', 'STR20251', 'b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'completed', '2025-08-22 23:59:59', '2025-08-22 23:59:59');
-- Has course progress for student STR20251
INSERT INTO hascourseprogressfor (student_code, course_progress_id) VALUES
('STR20251', 'aaaaaaa1-1111-4e1a-9c1a-aaaaaaaaaaa1');
-- Record related to content progress for STR20251 in course CRS1
INSERT INTO contentprogress (id, content_id, status, date_completed, last_updated) VALUES
('bbbbbbb2-2222-4e1a-9c1a-bbbbbbbbbbb2', 'b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'completed', '2025-08-22 23:59:59', '2025-08-22 23:59:59'),
('ccccccc3-3333-4e1a-9c1a-ccccccccccc3', 'b3b1c7e2-5555-4e1a-9c1a-eeee55555555', 'completed', '2025-08-22 23:59:59', '2025-08-22 23:59:59');
-- Has content progress for course progress of student STR20251
INSERT INTO hascontentprogressfor (content_progress_id, student_code) VALUES
('bbbbbbb2-2222-4e1a-9c1a-bbbbbbbbbbb2', 'STR20251'),
('ccccccc3-3333-4e1a-9c1a-ccccccccccc3', 'STR20251');

-- The following is about learning preferences for student STR20251
-- Chosen topics for STR20251
INSERT INTO chosentopic (id, topic_id, student_code, interest_level, knowledge_proficiency) VALUES
('a4a90dc8-4f69-41cc-a0f2-0e3d1b78c1e0', '69f19cd3-a324-44a7-ba9d-757330f6953f', 'STR20251', 'high', 'proficient'),
('78be53c8-d397-4a2b-b1d1-da3c20b534ae', 'd1f5c8e2-1c4b-4f3e-9c1a-123456789012', 'STR20251', 'medium', 'intermediate');
-- InterestedIn table
INSERT INTO interestedin (student_code, chosen_topic_id) VALUES
('STR20251', 'a4a90dc8-4f69-41cc-a0f2-0e3d1b78c1e0'),
('STR20251', '78be53c8-d397-4a2b-b1d1-da3c20b534ae');
-- Learning mode for STR20251 by inserting into haslearningmodefor
INSERT INTO haslearningmodefor (student_code, learning_mode_id) VALUES
('STR20251', '7543e822-b3df-4714-8913-07ddfc02cbbd');