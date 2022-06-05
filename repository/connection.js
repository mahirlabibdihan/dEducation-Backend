require("dotenv").config();

oracledb = require("oracledb");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];

class Repository {
  constructor() {
    this.connection = undefined;
  }
  // code to execute sql
  execute = async (sql, binds) => {
    let result;
    try {
      if (this.connection === undefined) {
        this.connection = await oracledb.getConnection({
          // user: process.env.DB_USER,
          // password: process.env.DB_PASSWORD,
          // connectionString: process.env.DB_CONNECTSTRING,
          user: "c##hiddenbrain",
          password: "root",
          connectionString: "localhost/orcl",
        });
      }
      result = await this.connection.execute(sql, binds);
      return {
        success: true,
        data: result.rows,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };
}
module.exports = Repository;
