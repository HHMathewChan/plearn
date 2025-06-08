-- Step one: drop first
\i /Users/mathewchan/plearn/sql/drop/drop_triggers.sql
\i /Users/mathewchan/plearn/sql/drop/drop_functions.sql
\i /Users/mathewchan/plearn/sql/drop/drop_sequences.sql
\i /Users/mathewchan/plearn/sql/drop/drop_tables.sql
\i /Users/mathewchan/plearn/sql/drop/drop_domains.sql

-- Step two: recreate
\i /Users/mathewchan/plearn/sql/init/create_domains.sql
\i /Users/mathewchan/plearn/sql/init/create_tables_1.sql
\i /Users/mathewchan/plearn/sql/init/create_tables_2.sql
\i /Users/mathewchan/plearn/sql/init/create_sequences.sql
\i /Users/mathewchan/plearn/sql/init/create_functions.sql
\i /Users/mathewchan/plearn/sql/init/triggers/all_xxxcode_trg.sql