--Constraint for create_table_1.sql
ALTER TABLE Enrolment
    ADD UNIQUE (student_id, course_id);