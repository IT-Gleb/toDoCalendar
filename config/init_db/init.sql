SELECT 'CREATE DATABASE tasksdb'
WHERE NOT EXISTS(SELECT FROM pg_database WHERE datname='tasksdb');

CREATE USER tasksuser PASSWORD '12345';

GRANT CONNECT ON DATABASE tasksdb TO tasksuser;
\C tasksdb; 

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS tblusers;

CREATE TABLE IF NOT EXISTS tblusers(
    id INT GENERATED ALWAYS AS IDENTITY,
    nickname VARCHAR(100),
    email VARCHAR(100),
    userkey TEXT,--Пароль
    isdeleted BOOLEAN DEFAULT false,
    create_at TIMESTAMP DEFAULT now(),
    update_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    parent_id BIGINT DEFAULT NULL,
    name text NOT NULL,
    completed BOOLEAN DEFAULT false,
    create_at TIMESTAMP DEFAULT now(),
    begin_at TIMESTAMP DEFAULT NULL,
    end_at TIMESTAMP DEFAULT NULL,
    isdeleted BOOLEAN DEFAULT false,
    userid INT, 
    items JSONB DEFAULT NULL,
    CONSTRAINT fk_users 
        FOREIGN KEY(userid) 
            REFERENCES tblusers(id) 
            ON DELETE CASCADE
);
CREATE INDEX idx_items ON tasks USING GIN (items);

GRANT SELECT,UPDATE,INSERT ON tasks TO tasksuser;
GRANT USAGE, SELECT ON SEQUENCE tasks_id_seq TO tasksuser;
GRANT SELECT,UPDATE,INSERT ON tblusers TO tasksuser;
GRANT USAGE, SELECT ON SEQUENCE tblusers_id_seq TO tasksuser;

CREATE USER admin PASSWORD 'postgres';
GRANT CONNECT ON DATABASE tasksdb TO admin;
GRANT ALL PRIVILEGES ON DATABASE tasksdb TO admin;
\c tasksdb;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA PUBLIC TO admin;
