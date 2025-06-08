--Constraint for create_table_1.sql
ALTER TABLE Enrolment
    ADD UNIQUE (student_code, course_id);