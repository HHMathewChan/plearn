-- Step one: drop first
\i drop/01_drop_tables.sql
\i drop/02a_drop_sequences.sql
\i drop/02_drop_domains.sql

-- Step two: recreate
\i init/02_create_domains.sql
\i init/02a_create_sequences.sql
\i init/03_create_tables.sql