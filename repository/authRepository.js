const Repository = require("./connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenExpiryDuration = 86400;

class AuthRepository extends Repository {
  constructor() {
    super();
  }
  signup = async (data) => {
    const query = `SELECT * FROM Users WHERE email = :email`;
    const params = {
      email: data.email,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 0) {
        const query = `INSERT INTO Users (name,email,pass,type) VALUES (:name,:email,:pass,:type)`;
        const params = {
          name: data.name,
          email: data.email,
          pass: bcrypt.hashSync(data.pass, 10),
          type: data.type,
        };
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };
  login = async (data) => {
    const query = `SELECT * FROM Users WHERE email = :email`;
    const params = {
      email: data.email,
    };
    const result = await this.execute(query, params);
    console.log(result);
    if (result.success == true) {
      if (result.data.length == 1) {
        const pass = result.data[0].PASS;
        if (bcrypt.compareSync(data.pass, pass)) {
          //signing a token with necessary information for validation
          const token = jwt.sign(
            {
              id: result.data[0].USER_ID,
              email: data.email,
              pass: pass,
              type: data.type,
            },
            process.env.JWT_SECRET,
            { expiresIn: `${tokenExpiryDuration}s` }
          );
          return {
            success: true,
            token: token,
          };
        }
      }
    }
    return {
      success: false,
    };
  };
  changePass = async (data) => {
    console.log("Change Password");
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1) {
        const pass = result.data[0].PASS;
        if (bcrypt.compareSync(data.currPass, pass)) {
          let query = `UPDATE Users SET pass = :pass where id = :id`;
          var newPassHash = bcrypt.hashSync(data.newPass, 10);
          let params = {
            pass: newPassHash,
            id: data.user_id,
          };
          let result = await this.execute(query, params);
          if (result.success) {
            // console.log(currPass, newPass);
            const token = jwt.sign(
              {
                id: data.user_id,
                email: data.email,
                pass: newPassHash,
                type: data.type,
              },
              process.env.JWT_SECRET,
              { expiresIn: `${tokenExpiryDuration}s` }
            );
            return {
              success: true,
              token: token,
            };
          }
          return result;
        }
      }
    }

    return {
      success: false,
    };
  };
  tokenValidity = async (id, email, pass) => {
    const query =
      "SELECT * FROM Users where id = :id and email = :email and pass = :pass";
    const params = { id: id, email: email, pass: pass };
    const result = await this.execute(query, params);
    console.log("ALL:", id, email, pass);
    console.log(result);
    if (result.success == true) {
      if (result.data.length == 1) {
        return true;
      }
    }
    return false;
  };
}

module.exports = AuthRepository;
