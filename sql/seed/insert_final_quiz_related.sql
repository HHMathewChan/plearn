-- The following data is for the course:('b3b1c7e2-3333-4e1a-9c1a-cccc33333333', 'CRS1', 'Introduction to Nuclear Engineering and Ionizing Radiation')

--Final quiz
INSERT INTO finalquiz (id,passing_score, title) VALUES
('99999999-0009-4e1a-9c1a-333333333339', 50, 'Final Quiz for Introduction to Nuclear Engineering and Ionizing Radiation');

--hasfinalquizfor table
INSERT INTO hasfinalquizfor (final_quiz_id, course_id) VALUES
('99999999-0009-4e1a-9c1a-333333333339', 'b3b1c7e2-3333-4e1a-9c1a-cccc33333333');

-- Question 1
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('0cb22227-5b0b-4e88-92db-c182c6cc9c7a',
 'Which of the following regions on the Table of Nuclides is the most likely to contain isotopes that undergo positron decay?',
 'c98f665c-3546-448e-9b5c-6c3121756f8e',
 'easy');

-- hasquestionfor table for question 1
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('0cb22227-5b0b-4e88-92db-c182c6cc9c7a', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('2778b381-7b79-4808-94ea-ff632f16ee48','0cb22227-5b0b-4e88-92db-c182c6cc9c7a','a) Very neutron-rich (N >> Z)'),
('70370e17-48bf-4b69-8916-0c30b64eef25','0cb22227-5b0b-4e88-92db-c182c6cc9c7a','b) Slightly neutron-rich (N > Z)'),
('c98f665c-3546-448e-9b5c-6c3121756f8e','0cb22227-5b0b-4e88-92db-c182c6cc9c7a','c) Very proton-rich (Z >> N)'),
('b70796e0-c65e-47ee-a9d3-4d36e8283825','0cb22227-5b0b-4e88-92db-c182c6cc9c7a','d) Heavy (high A)');

-- Question 2
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('22222222-0002-4e1a-9c1a-bbbbbbbbbbb2',
 'The meta-state of Technetium-99m has an energy of 0.143 MeV above its ground state. How much heavier is 99mTc compared to 99Tc?',
 'cebf391e-0be9-4996-ba4d-0d881fa90e25',
 'medium');

-- hasquestionfor table for question 2
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('22222222-0002-4e1a-9c1a-bbbbbbbbbbb2', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('fbc2a5b7-0370-4192-bdac-e8060fd194cf','22222222-0002-4e1a-9c1a-bbbbbbbbbbb2','a) About one part per thousand (ppt) heavier'),
('cebf391e-0be9-4996-ba4d-0d881fa90e25','22222222-0002-4e1a-9c1a-bbbbbbbbbbb2','b) About one part per million (ppm) heavier'),
('bab50c8a-f550-492a-839e-8f3f2aa8fa5b','22222222-0002-4e1a-9c1a-bbbbbbbbbbb2','c) About one part per billion (ppb) heavier'),
('aeb21aca-3959-4bbe-8127-a64f701e1d03','22222222-0002-4e1a-9c1a-bbbbbbbbbbb2','d) They have the exact same mass');

-- Question 3
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('33333333-0003-4e1a-9c1a-ccccccccccc3',
 'Under what primary condition could an isotope theoretically decay by emitting a Carbon-14 nucleus?',
 'b6121731-d7c2-449b-b7d9-fe2d52866220',
 'easy');

-- hasquestionfor table for question 3
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('33333333-0003-4e1a-9c1a-ccccccccccc3', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('9ef6148a-5edb-4baf-a1cf-3bf352e63737','33333333-0003-4e1a-9c1a-ccccccccccc3','a) The parent nucleus must be heavier than lead'),
('b6121731-d7c2-449b-b7d9-fe2d52866220','33333333-0003-4e1a-9c1a-ccccccccccc3','b) The reaction must have a positive Q-value (be exothermic)'),
('32038cc3-4f33-4668-9037-3ce9a6c283cc','33333333-0003-4e1a-9c1a-ccccccccccc3','c) The isotope must have a very short half-life'),
('5c97624b-f4b5-4658-a618-70b61b637409','33333333-0003-4e1a-9c1a-ccccccccccc3','d) The decay must occur in a high-temperature environment');

-- Question 4
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('44444444-0004-4e1a-9c1a-ddddddddddd4',
 'Why is neutron inelastic scattering, denoted as (n, n''), not considered a true scattering reaction?',
 'ddab45be-3480-4eb8-8f19-3719df668b71',
 'easy');

-- hasquestionfor table for question 4
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('44444444-0004-4e1a-9c1a-ddddddddddd4', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('ddab45be-3480-4eb8-8f19-3719df668b71','44444444-0004-4e1a-9c1a-ddddddddddd4','a) The neutron is absorbed and a different, lower-energy neutron is emitted, meaning kinetic energy is not conserved (Q≠0)'),
('b63b9a7d-5882-4e2c-9ec8-c07d293a71fe','44444444-0004-4e1a-9c1a-ddddddddddd4','b) The neutron does not change its direction after interacting with the nucleus'),
('9267676b-edbd-4966-8f79-056f14fca1fb','44444444-0004-4e1a-9c1a-ddddddddddd4','c) The nucleus is left in its ground state after the interaction'),
('efac8463-062d-4f79-ab5e-f8b0a77c5762','44444444-0004-4e1a-9c1a-ddddddddddd4','d) The reaction can only occur with low-energy neutrons');

-- Question 5
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('55555555-0005-4e1a-9c1a-eeeeeeeeeee5',
 'Why is it critical not to round nuclear mass values when identifying gamma peaks with an HPGe detector that has a resolution of 0.5 keV?',
 'a1f6d888-da86-49a5-85b4-dc07f250e11f',
 'medium');

-- hasquestionfor table for question 5
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('55555555-0005-4e1a-9c1a-eeeeeeeeeee5', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('2616e72b-64e9-44f2-95e6-9d912dd2ad4e','55555555-0005-4e1a-9c1a-eeeeeeeeeee5','a) Rounding violates the fundamental laws of nuclear physics'),
('8db8957d-9836-4678-8084-5d04cb668eb2','55555555-0005-4e1a-9c1a-eeeeeeeeeee5','b) HPGe detectors can only measure unrounded, integer values'),
('a1f6d888-da86-49a5-85b4-dc07f250e11f','55555555-0005-4e1a-9c1a-eeeeeeeeeee5','c) Even small rounding can introduce calculation errors greater than the detector''s resolution, leading to misidentification'),
('08df9da2-0c18-4a59-99bd-3a3da59f1904','55555555-0005-4e1a-9c1a-eeeeeeeeeee5','d) Rounding makes the calculations significantly more complex');

-- Question 6
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('66666666-0006-4e1a-9c1a-fffffffffff6',
 'Following the Fukushima incident, what is the primary reason that fish in the ocean were still considered safe to eat despite the large release of radiation?',
 '5988d1a8-121f-4804-b8d9-57f2f6f51b3f',
 'easy');

-- hasquestionfor table for question 6
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('66666666-0006-4e1a-9c1a-fffffffffff6', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('6c45390b-894d-44a6-9530-255531e60d7b','66666666-0006-4e1a-9c1a-fffffffffff6','a) Fish are naturally immune to the types of radiation released'),
('76d79428-6c1d-49d6-813d-20ba367553f7','66666666-0006-4e1a-9c1a-fffffffffff6','b) The released radiation decayed to safe levels within a few hours'),
('5988d1a8-121f-4804-b8d9-57f2f6f51b3f','66666666-0006-4e1a-9c1a-fffffffffff6','c) The radiation was rapidly diluted by the immense volume of the Pacific Ocean, leading to a minimal increase in specific activity'),
('a4da67e7-f9ec-463c-95a3-13d760c1d556','66666666-0006-4e1a-9c1a-fffffffffff6','d) All the radiation was carried into the upper atmosphere and away from the ocean');

-- Question 7
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('77777777-0007-4e1a-9c1a-111111111117',
 'Theoretically, under what condition could an alpha particle be emitted with kinetic energy exactly equal to the total Q-value of the decay (Eα = Q)?',
 '2c5476b0-2c5f-4bc4-ba84-e51358ca7e59',
 'medium');

-- hasquestionfor table for question 7
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('77777777-0007-4e1a-9c1a-111111111117', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('2c5476b0-2c5f-4bc4-ba84-e51358ca7e59','77777777-0007-4e1a-9c1a-111111111117','a) If the daughter nucleus had nearly infinite mass'),
('9de3ed8a-ca8d-48b4-863b-327a3709bc02','77777777-0007-4e1a-9c1a-111111111117','b) If the parent nucleus had zero initial momentum'),
('04aa7632-4ee3-4319-be24-d560bff8d6c8','77777777-0007-4e1a-9c1a-111111111117','c) If the alpha particle were emitted in a perfect vacuum'),
('c727f0e9-cab6-4803-994e-f5c259c27549','77777777-0007-4e1a-9c1a-111111111117','d) If the Q-value of the reaction were exactly 1.022 MeV');

-- Question 8
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('88888888-0008-4e1a-9c1a-222222222228',
 'In the described series decay within a reactor where λ1 = λ2 = Φσ1 = Φσ2, when does the quantity of the second isotope (N2) reach its maximum?',
 'c183d2d8-b877-4ad9-aaac-0c42425c17d4',
 'hard');

-- hasquestionfor table for question 8
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('88888888-0008-4e1a-9c1a-222222222228', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('21db97eb-7fec-4828-8ceb-b0a27859b692','88888888-0008-4e1a-9c1a-222222222228','a) When the amount of N1 is equal to the amount of N2 (N1 = N2)'),
('c183d2d8-b877-4ad9-aaac-0c42425c17d4','88888888-0008-4e1a-9c1a-222222222228','b) When the amount of N1 is twice the amount of N2 (N1 = 2 N2)'),
('98d859ba-169e-416a-a934-963e309e3999','88888888-0008-4e1a-9c1a-222222222228','c) When the amount of N2 is equal to the amount of N3 (N2 = N3)'),
('a10aec4b-e14d-4046-94ee-7d09287b12f9','88888888-0008-4e1a-9c1a-222222222228','d) When the amount of N1 has completely decayed to zero');

-- Bonus Question: Solar Neutrinos (inserted as Question 9 / bonus)
INSERT INTO question (id, question_text, correct_option_id, difficulty) VALUES
('99999999-0009-4e1a-9c1a-333333333339',
 'Order-of-magnitude estimate: how many solar neutrinos pass through you each second?',
 '1a9df9ff-9602-4df3-a027-b436c2490cd4',
 'hard');

-- hasquestionfor table for Question 9 / bonus
INSERT INTO hasquestionfor (question_id, final_quiz_id) VALUES
('99999999-0009-4e1a-9c1a-333333333339', '99999999-0009-4e1a-9c1a-333333333339');

INSERT INTO questionoption (id, question_id, option_text) VALUES
('9e462171-23ea-4f7c-868b-68cdc40b8ebd','99999999-0009-4e1a-9c1a-333333333339','a) 1×10^8 (100 million)'),
('1a9df9ff-9602-4df3-a027-b436c2490cd4','99999999-0009-4e1a-9c1a-333333333339','b) 1×10^14 (100 trillion)'),
('0a0d1fd7-3135-4c76-a9ab-a3320e58c452','99999999-0009-4e1a-9c1a-333333333339','c) 1×10^20 (100 quintillion)'),
('0d5d6bf6-aaba-49c6-82fc-b20b3281eeb5','99999999-0009-4e1a-9c1a-333333333339','d) 1×10^38 (100 duodecillion)');