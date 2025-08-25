-- Quiz attempt for STR20252
INSERT INTO quizattempt (id, score, started_at, completed_at, attempt_count, attempt_status, updated_at) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 100.00, '2025-08-23 01:00:00', '2025-08-23 02:00:00', 1, 'completed', '2025-08-23 02:00:00');

-- Log past attempt for student STR20252
INSERT INTO logpastattemptforstudentat (quiz_attempt_id, student_code) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 'STR20252');

-- Log past attempt for final quiz with STR20252
INSERT INTO logpastattemptforfinalquizwith (final_quiz_id, quiz_attempt_id) VALUES
('99999999-0009-4e1a-9c1a-333333333339', 'b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa');