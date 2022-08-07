const Repository = require("./connection");

class AuthRepository extends Repository {
  constructor() {
    super();
  }
  getUserIDPass = async (email, type) => {
    const query = `
    BEGIN
       :ret := GET_USER_BY_EMAIL(:email);
    END;
    `;
    const params = {
      email: email,
      ret: { dir: oracledb.BIND_OUT, type: "USERS%ROWTYPE" },
    };
    const result = await this.execute_pl(query, params);
    if (result.success && result.data.ROLE == type) {
      return {
        success: true,
        id: result.data.USER_ID,
        pass: result.data.PASS,
      };
    }
    return result;
  };
  signup = async (data) => {
    const query = `
    BEGIN
      CREATE_USER (:name,:email,:pass,:type);
    END;
    `;
    const params = {
      name: data.name,
      email: data.email,
      pass: data.hashPass,
      type: data.type,
    };
    const result = await this.execute_pl(query, params);
    if (result.success) {
      return {
        success: true,
      };
    }
    if (result.errorNum === 1) result.error = "Email address already in use";
    return result;
  };
  changePass = async (user_id, newPassHash) => {
    const query = `
      BEGIN
        CHANGE_PASSWORD(:id,:pass);
      END;
    `;
    const params = {
      pass: newPassHash,
      id: user_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  tokenValidity = async (id, email, pass, role) => {
    const query = `
    BEGIN
      :ret := IS_VALID_TOKEN(:id,:email,:pass,:role);
    END;
    `;
    const params = {
      id: id,
      email: email,
      pass: pass,
      role: role,
      ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
    };
    const result = await this.execute_pl(query, params);
    if (result.success && result.data === "YES") {
      return true;
    }
    return false;
  };
}

module.exports = AuthRepository;
