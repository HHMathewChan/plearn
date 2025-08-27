-- Quiz attempt for STR20252
INSERT INTO quizattempt (id, score, started_at, completed_at, attempt_count, attempt_status, updated_at) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 100.00, '2025-08-23 01:00:00', '2025-08-23 02:00:00', 1, 'completed', '2025-08-23 02:00:00');

-- Log past attempt for student STR20252
INSERT INTO logpastattemptforstudentat (quiz_attempt_id, student_code) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 'STR20252');

-- Log past attempt for final quiz with STR20252
INSERT INTO logpastattemptforfinalquizwith (final_quiz_id, quiz_attempt_id) VALUES
('99999999-0009-4e1a-9c1a-333333333339', 'b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa');

-- The following are for testing the use case for content progress for STR20251
--contentProgress
INSERT INTO contentprogress (id, content_id, status, date_completed, last_updated) VALUES
('2551e09a-625d-44bb-81a9-4106a735e6ec', 'b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'not_started', NULL, NOW()),
('e65147de-e92b-4744-a426-c1bfd5137aab', 'b3b1c7e2-5555-4e1a-9c1a-eeee55555555', 'not_started', NULL, NOW());

--hasContentProgress
INSERT INTO hascontentprogressfor (student_code, content_progress_id) VALUES
('STR20251', '2551e09a-625d-44bb-81a9-4106a735e6ec'),
('STR20251', 'e65147de-e92b-4744-a426-c1bfd5137aab');

-- The following are for testing the use case for complete a final quiz for STR20251
-- -- Quiz attempt for STR20251
-- INSERT INTO quizattempt (id, score, started_at, completed_at, attempt_count, attempt_status, updated_at) VALUES
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', null, '2025-08-23 01:00:00', '2025-08-23 02:00:00', 1, 'in_progress', '2025-08-23 02:00:00');

-- -- Log active attempt for student STR20251
-- INSERT INTO logactiveattemptforstudentat (quiz_attempt_id, student_code) VALUES
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', 'STR20251');

-- -- Log active attempt for final quiz with STR20251
-- INSERT INTO logactiveattemptforfinalquizwith (final_quiz_id, quiz_attempt_id) VALUES
-- ('99999999-0009-4e1a-9c1a-333333333339', 'd00c1f2d-ad92-48b0-8b41-840ed4e26d5a');

-- -- Insert 9 StudentAnswer records
-- INSERT INTO studentanswer (id, selected_option_id, is_correct) VALUES
-- ('11111111-aaaa-4e1a-9c1a-aaaaaaaaaaaa', NULL, NULL),
-- ('22222222-bbbb-4e1a-9c1a-bbbbbbbbbbbb', NULL, NULL),
-- ('33333333-cccc-4e1a-9c1a-cccccccccccc', NULL, NULL),
-- ('44444444-dddd-4e1a-9c1a-dddddddddddd', NULL, NULL),
-- ('55555555-eeee-4e1a-9c1a-eeeeeeeeeeee', NULL, NULL),
-- ('66666666-ffff-4e1a-9c1a-ffffffffffff', NULL, NULL),
-- ('77777777-1111-4e1a-9c1a-111111111111', NULL, NULL),
-- ('88888888-2222-4e1a-9c1a-222222222222', NULL, NULL),
-- ('99999999-3333-4e1a-9c1a-333333333333', NULL, NULL);

-- -- Insert corresponding records into LogAnswerForQuestionWith
-- INSERT INTO loganswerforquestionwith (question_id, student_answer_id) VALUES
-- ('0cb22227-5b0b-4e88-92db-c182c6cc9c7a', '11111111-aaaa-4e1a-9c1a-aaaaaaaaaaaa'),
-- ('22222222-0002-4e1a-9c1a-bbbbbbbbbbb2', '22222222-bbbb-4e1a-9c1a-bbbbbbbbbbbb'),
-- ('33333333-0003-4e1a-9c1a-ccccccccccc3', '33333333-cccc-4e1a-9c1a-cccccccccccc'),
-- ('44444444-0004-4e1a-9c1a-ddddddddddd4', '44444444-dddd-4e1a-9c1a-dddddddddddd'),
-- ('55555555-0005-4e1a-9c1a-eeeeeeeeeee5', '55555555-eeee-4e1a-9c1a-eeeeeeeeeeee'),
-- ('66666666-0006-4e1a-9c1a-fffffffffff6', '66666666-ffff-4e1a-9c1a-ffffffffffff'),
-- ('77777777-0007-4e1a-9c1a-111111111117', '77777777-1111-4e1a-9c1a-111111111111'),
-- ('88888888-0008-4e1a-9c1a-222222222228', '88888888-2222-4e1a-9c1a-222222222222'),
-- ('99999999-0009-4e1a-9c1a-333333333339', '99999999-3333-4e1a-9c1a-333333333333');

-- -- Insert corresponding records into LogAnswerForAttemptWith
-- INSERT INTO loganswerforattemptwith (quiz_attempt_id, student_answer_id) VALUES
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '11111111-aaaa-4e1a-9c1a-aaaaaaaaaaaa'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '22222222-bbbb-4e1a-9c1a-bbbbbbbbbbbb'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '33333333-cccc-4e1a-9c1a-cccccccccccc'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '44444444-dddd-4e1a-9c1a-dddddddddddd'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '55555555-eeee-4e1a-9c1a-eeeeeeeeeeee'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '66666666-ffff-4e1a-9c1a-ffffffffffff'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '77777777-1111-4e1a-9c1a-111111111111'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '88888888-2222-4e1a-9c1a-222222222222'),
-- ('d00c1f2d-ad92-48b0-8b41-840ed4e26d5a', '99999999-3333-4e1a-9c1a-333333333333');