-- Course
INSERT INTO course (id, course_code, title, difficulty, description) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'CRS1', 'Introduction to Nuclear Engineering and Ionizing Radiation', 'easy', 'This course provides an introduction to nuclear science and its engineering applications. It describes basic nuclear models, radioactivity, nuclear reactions, and kinematics; covers the interaction of ionizing radiation with matter, with an emphasis on radiation detection, radiation shielding, and radiation effects on human health; and presents energy systems based on fission and fusion nuclear reactions, as well as industrial and medical applications of nuclear science.'),
('b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'CRS2', 'Energy Economics', 'medium', 'This course explores the theoretical and empirical perspectives on individual and industrial demand for energy, energy supply, energy markets, and public policies affecting energy markets. It discusses aspects of the oil, natural gas, electricity, and nuclear power sectors and examines energy tax, price regulation, deregulation, energy efficiency and policies for controlling emission.');

-- CourseContent
INSERT INTO coursecontent (id, course_id, title, content_type, content_url) VALUES
('b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'b3b1c7e2-3333-4e1a-9c1a-cccc33333333', '22.01 Spring 2024 Lecture 01: Radiation History to the Present', 'pdf', '/courseResources/CRS1/mit22_01_s24_radiation_history.pdf'),
('b3b1c7e2-5555-4e1a-9c1a-eeee55555555', 'b3b1c7e2-3333-4e1a-9c1a-cccc33333333', '22.01 Spring 2024 Lecture 02: Radiation-Utilizing Technology Overview', 'pdf', '/courseResources/CRS1/mit22_01_s24_radiation_utilizing_tech.pdf');

-- Comprises
INSERT INTO comprises (course_id, course_content_id) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'b3b1c7e2-4444-4e1a-9c1a-dddd44444444'),
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'b3b1c7e2-5555-4e1a-9c1a-eeee55555555');

-- CopyrightOwner
INSERT INTO copyrightowner (id, name, type, contact_email, license_type, license_url) VALUES
('b3b1c7e2-8888-4e1a-9c1a-bbbb88888888', 'OpenCourseWare', 'institution', 'info@ocw.org', 'OER', 'https://ocw.org/license'),
('b3b1c7e2-9999-4e1a-9c1a-cccc99999999', 'Creative Commons Foundation', 'institution', 'contact@creativecommons.org', 'CC', 'https://creativecommons.org/licenses/by-sa/4.0/');


-- OwnCourseBy
INSERT INTO owncourseby (course_id, copyright_owner_id) VALUES
('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'b3b1c7e2-8888-4e1a-9c1a-bbbb88888888'),
('b3b1c7e2-4444-4e1a-9c1a-dddd44444444', 'b3b1c7e2-9999-4e1a-9c1a-cccc99999999');

-- Topic
INSERT INTO topic (id, name) VALUES
('b3b1c7e2-aaaa-4e1a-9c1a-aaaaaaaaaaaa', 'JavaScript'),
('b3b1c7e2-bbbb-4e1a-9c1a-bbbbbbbbbbbb', 'Python'),
('69f19cd3-a324-44a7-ba9d-757330f6953f', 'Nuclear Physics'),
('d1f5c8e2-1c4b-4f3e-9c1a-123456789012', 'Energy Economics'),
('3f8a2a7e-5a47-4c88-9b1c-6a2b33d1f001', 'Web Development'),
('e24c9e9a-3c92-4a7d-ae15-9c1f3ef0a002', 'Databases'),
('7d3b6b67-9f33-4a87-9a56-142c89e2f003', 'Machine Learning'),
('1baf1a65-321c-43c6-9ef7-8c57a2b6f004', 'Cyber Security'),
('f13c2b98-8d65-40e7-8e62-b49a77e5f005', 'Software Engineering'),
('cb2d8a71-92f2-44b2-92a1-9d237c2e6006', 'Cloud Computing'),
('9c8a1d87-6b8c-4c32-81d9-2df77a5e0007', 'Mobile App Development'),
('5a9d1f83-7e42-4a2a-b4c1-61b822d4c008', 'Data Structures and Algorithms'),
('44e8b7f4-32bb-4c9b-8895-f781c5d1a009', 'Artificial Intelligence'),
('6fd3b3c1-1c2f-46b1-82a2-31b9d88a000a', 'Computer Networks');

-- LabelCourseWith
INSERT INTO labelcoursewith (id, topic_id, course_id) VALUES
-- CRS1 and Nuclear Physics
('99775da7-55bc-4ff7-a109-3fc6f6407e4f','69f19cd3-a324-44a7-ba9d-757330f6953f','b3b1c7e2-3333-4e1a-9c1a-cccc33333333'),
-- CRS2 and Energy Economics
('801ed164-86f5-45bf-bff2-5280c714825b','d1f5c8e2-1c4b-4f3e-9c1a-123456789012','b3b1c7e2-4444-4e1a-9c1a-dddd44444444');