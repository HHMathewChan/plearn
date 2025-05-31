-- Step one: drop first
\i drop/drop_tables.sql
\i drop/drop_sequences.sql
\i drop/drop_domains.sql

-- Step two: recreate
\i init/create_domains.sql
\i init/create_sequences.sql
\i init/create_tables.sql