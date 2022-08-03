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
    if (result.success && result.data.ret.ROLE == type) {
      return {
        success: true,
        id: result.data.ret.USER_ID,
        pass: result.data.ret.PASS,
      };
    }
    return {
      success: false,
    };
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
        success: result.success,
      };
    }
    // console.log("ALREADY TAKEN");
    return {
      success: false,
      error: "Email is already taken",
    };
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
    if (result.success) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
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
    if (result.success && result.data.ret === "YES") {
      return true;
    }
    return false;
  };
}

module.exports = AuthRepository;
