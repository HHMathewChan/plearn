-- The following are for testing the use case for complete a final quiz for STR20251 without completed courses
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