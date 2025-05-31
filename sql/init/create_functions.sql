-- aim: to allow student_code to auto increment
-- precondition 1: student_code_seq is created
-- postcondition 1: trg_generate_student_code can be triggered
CREATE OR REPLACE FUNCTION generate_student_code()
RETURNS TRIGGER AS $$
DECLARE
    seq_number TEXT;
    next_seq INT;
    this_year TEXT;
    prefix TEXT;
BEGIN
    next_seq := nextval('student_code_seq');  -- Pulls the next number
    seq_number := next_seq::TEXT;
    prefix := 'STR';
    this_year := TO_CHAR(NOW(), 'YYYY');
    NEW.student_code := prefix || this_year || seq_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;