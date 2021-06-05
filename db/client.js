const { Client } = require("pg");
const client = new Client({connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/uf-technical-data', ssl: {
  rejectUnauthorized: false
}});
module.exports = client;