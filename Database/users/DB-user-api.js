const Database = require("../database");
const database = new Database();
async function getUserByEmail(email) {
  const sql = `SELECT * FROM Users WHERE email = :email`;
  const binds = {
    email: email,
  };
  const result = (await database.execute(sql, binds)).rows;
  return result[0];
}

module.exports = { getUserByEmail };
