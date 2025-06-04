This the the project for TM470

# Directory structure
plearn/
├── backend
│   ├── app.js
│   ├── db.js
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   └── test.restbook
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── README.md
└── sql
    ├── drop
    │   ├── drop_domains.sql
    │   ├── drop_functions.sql
    │   ├── drop_sequences.sql
    │   ├── drop_tables.sql
    │   └── drop_triggers.sql
    ├── init
    │   ├── create_constraint_1.sql
    │   ├── create_constraint_2.sql
    │   ├── create_domains.sql
    │   ├── create_functions.sql
    │   ├── create_sequences.sql
    │   ├── create_tables_1.sql
    │   ├── create_tables_2.sql
    │   └── triggers
    │       └── all_xxxcode_trg.sql
    ├── reset.sql
    └── seed
        └── insert_sample_data.sql