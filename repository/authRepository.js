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

  // getUserByEmail = async (email) => {
  //   const query = `
  //   BEGIN
  //     :ret := GET_USER_BY_EMAIL(:email);
  //   END;
  //   `;
  //   const params = {
  //     email: email,
  //     ret: { dir: oracledb.BIND_OUT, type: "USERS%ROWTYPE" },
  //   };
  //   const result = await this.execute_pl(query, params);
  //   if (result.success) {
  //     return {
  //       success: true,
  //       data: result.data.ret,
  //     };
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // getUserByID = async (id) => {
  //   const query = `
  //   SELECT *
  //   FROM Users
  //   WHERE user_id = :id
  //   `;
  //   const params = {
  //     id: id,
  //   };
  //   const result = await this.execute(query, params);
  //   if (result.data.length > 0) {
  //     return {
  //       success: true,
  //       data: result.data[0],
  //     };
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // getUserPassword = async (email, type) => {
  //   const query = `
  //   BEGIN
  //     :ret := GET_PASSWORD(:email,:type);
  //   END;
  //   `;
  //   const params = {
  //     email: email,
  //     type: type,
  //     ret: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
  //   };
  //   const result = await this.execute_pl(query, params);
  //   console.log(result);
  //   if (result.success) {
  //     return {
  //       success: true,
  //       pass: result.data.ret,
  //     };
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // isEmailTaken = async (email) => {
  //   const result = await this.getUserByEmail(email);
  //   return result.success == true;
  // };
  // addToTutors = async (id) => {
  //   const query = `
  //   INSERT INTO Tutors (tutor_id)
  //   VALUES (:id)
  //   `;
  //   const params = {
  //     id: id,
  //   };
  //   return await this.execute(query, params);
  // };
  // addToStudents = async (id) => {
  //   const query = `
  //   INSERT INTO Students (student_id)
  //   VALUES (:id)
  //   `;
  //   const params = {
  //     id: id,
  //   };
  //   return await this.execute(query, params);
  // };
  // addToUsers = async (data) => {
  //   const query = `
  //   INSERT INTO Users (name,email,pass,type)
  //   VALUES (:name,:email,:pass,:type)
  //   `;
  //   const params = {
  //     name: data.name,
  //     email: data.email,
  //     pass: bcrypt.hashSync(data.pass, 10),
  //     type: data.type,
  //   };
  //   const res = await this.execute(query, params);
  //   if (res.success) {
  //     const result = await this.getUserByEmail(data.email);
  //     if (result.data.ROLE === "STUDENT") {
  //       return await this.addToStudents(result.data.USER_ID);
  //     } else {
  //       return await this.addToTutors(result.data.USER_ID);
  //     }
  //   }
  //   return res;
  // };

  // getToken = (id, email, pass, type) => {
  //   const token = jwt.sign(
  //     {
  //       id: id,
  //       email: email,
  //       pass: pass,
  //       type: type,
  //     },
  //     process.env.JWT_SECRET,
  //     { expiresIn: `${tokenExpiryDuration}s` }
  //   );
  //   return token;
  // };
  // login = async (data) => {
  //   const result = await this.getUserByEmail(data.email);
  //   if (!result.success || result.data.ROLE !== data.type) {
  //     return {
  //       success: false,
  //     };
  //   }
  //   if (result.success) {
  //     const pass = result.data.PASS;
  //     if (bcrypt.compareSync(data.pass, pass)) {
  //       //signing a token with necessary information for validation
  //       return {
  //         success: true,
  //         token: this.getToken(
  //           result.data.USER_ID,
  //           result.data.EMAIL,
  //           pass,
  //           result.data.ROLE
  //         ),
  //       };
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };
  // updatePass = async (pass, id) => {
  //   const query = `
  //   BEGIN
  //     CHANGE_PASSWORD(:id,:pass);
  //   END;
  //   `;
  //   const newPassHash = bcrypt.hashSync(pass, 10);
  //   const params = {
  //     pass: newPassHash,
  //     id: id,
  //   };
  //   await this.execute(query, params);
  //   return newPassHash;
  // };
}

module.exports = AuthRepository;
