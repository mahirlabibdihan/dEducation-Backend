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
    let result;
    try {
      if (this.connection === undefined) {
        this.connection = await oracledb.getConnection({
          user: process.env.db_user,
          password: process.env.db_password,
          connectionString: process.env.db_connectstring,
        });
      }
      console.log(query, params);
      result = await this.connection.execute(query, params);
      return {
        success: true,
        data: result.rows,
      };
    } catch (error) {
      console.log("COULD NOT CONNECT TO ORACLE");
      console.log(error);
      console.log(query, params);
      return {
        success: false,
        error: error,
      };
    }
  };
  execute_pl = async (query, params) => {
    let result;
    try {
      if (this.connection === undefined) {
        this.connection = await oracledb.getConnection({
          user: process.env.db_user,
          password: process.env.db_password,
          connectionString: process.env.db_connectstring,
        });
      }
      // console.log("=>", query, params);
      result = await this.connection.execute(query, params);
      return {
        success: true,
        data:
          result.outBinds && result.outBinds.ret ? result.outBinds.ret : null,
      };
    } catch (error) {
      console.log(error.message);
      let message = error.message.split("\n")[0].split(":")[1].trim();
      if (error.errorNum == 1400) {
        message = "Invalid Input";
      }
      console.log(query, params, message, error.errorNum);
      return {
        success: false,
        error: message,
        errorNum: error.errorNum,
      };
    }
  };
}
module.exports = Repository;
