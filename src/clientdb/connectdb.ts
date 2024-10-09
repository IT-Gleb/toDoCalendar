import postgres from "postgres";

const sql_Options = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  ssl: false,
};

const sql = postgres("", sql_Options);

export default sql;
