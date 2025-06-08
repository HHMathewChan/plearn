/** aim:attach generate_student_code() function to the student code
precondition 1: generate_student_code() function is created
postcondition 1: student_code attribute can be auto incrmented**/
CREATE TRIGGER trg_generate_student_code
BEFORE INSERT ON Student
FOR EACH ROW
EXECUTE FUNCTION generate_student_code();