-- Quiz attempt for STR20252
INSERT INTO quizattempt (id, score, started_at, completed_at, attempt_count, attempt_status, updated_at) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', NULL, NOW(), NULL, 1, 'in_progress', NOW());

-- Student answer for STR20252
INSERT INTO studentanswer (id, selected_option_id, is_correct) VALUES
('b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb', 'b3b1c7e2-cccc-4e1a-9c1a-cccccccccccc', NULL);

-- Log active quiz attempt for STR20252
INSERT INTO logactivequizattemptforstudentat (quiz_attempt_id, student_code) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 'STR20252');

-- Log student answer for STR20252
INSERT INTO loganswerforattemptwith (quiz_attempt_id, student_answer_id) VALUES
('b3b1c7e2-eeee-4e1a-9c1a-eeeeeeeeeeee', 'b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb');

-- Log answer for final quiz with STR20252
INSERT INTO loganswerforfinalquizwith (final_quiz_id, student_answer_id) VALUES
('b3b1c7e2-ffff-4e1a-9c1a-ffffffffffff', 'b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb');