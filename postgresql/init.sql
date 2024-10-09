SELECT 'CREATE DATABASE tasksdb'
WHERE NOT EXISTS(SELECT FROM pg_database WHERE datname='tasksdb');

CREATE USER tasksuser PASSWORD '12345';
GRANT CONNECT ON DATABASE tasksdb TO taskuser;

\C tasksdb; 

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    parent_id BIGINT DEFAULT NULL,
    name text NOT NULL,
    completed BOOLEAN DEFAULT false,
    create_at TIMESTAMP DEFAULT now(),
    begin_at TIMESTAMP DEFAULT NULL,
    end_at TIMESTAMP DEFAULT NULL,
    items JSONB DEFAULT NULL
);


GRANT SELECT ON tasks TO taskuser;
GRANT UPDATE ON tasks TO taskuser;
GRANT INSERT ON tasks TO taskuser;
GRANT USAGE, SELECT ON SEQUENCE tasks_id_seq TO taskuser;