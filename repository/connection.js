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
  execute = async (query, params) => {
    console.log(
      process.env.db_user,
      process.env.db_password,
      process.env.db_connectstring
    );
    let result;
    try {
      if (this.connection === undefined) {
        this.connection = await oracledb.getConnection({
          user: process.env.db_user,
          password: process.env.db_password,
          connectionString: process.env.db_connectstring,
          // user: "c##hiddenbrain",
          // password: "root",
          // connectionString: "localhost/orcl",
        });
      }
      result = await this.connection.execute(query, params);
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
