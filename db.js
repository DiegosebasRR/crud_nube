const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db.fzjyovkhjsixomieeivh.supabase.co",
  database: "postgres",
  password: "ceviche123.",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
