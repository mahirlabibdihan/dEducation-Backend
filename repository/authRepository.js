const Repository = require("./connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tokenExpiryDuration = 86400;

class AuthRepository extends Repository {
  constructor() {
    super();
  }
  getUserByEmail = async (email) => {
    const query = `
    SELECT *
    FROM Users
    WHERE email = :email
    `;
    const params = {
      email: email,
    };
    const result = await this.execute(query, params);
    if (result.data.length > 0) {
      return {
        success: true,
        data: result.data[0],
      };
    }
    return {
      success: false,
    };
  };
  getUserByID = async (id) => {
    const query = `
    SELECT *
    FROM Users
    WHERE user_id = :id
    `;
    const params = {
      id: id,
    };
    const result = await this.execute(query, params);
    if (result.data.length > 0) {
      return {
        success: true,
        data: result.data[0],
      };
    }
    return {
      success: false,
    };
  };
  isEmailTaken = async (email) => {
    const result = await this.getUserByEmail(email);
    return result.success == true;
  };
  addToTutors = async (id) => {
    const query = `
    INSERT INTO Tutors (tutor_id)
    VALUES (:id)
    `;
    const params = {
      id: id,
    };
    return await this.execute(query, params);
  };
  addToStudents = async (id) => {
    const query = `
    INSERT INTO Students (student_id)
    VALUES (:id)
    `;
    const params = {
      id: id,
    };
    return await this.execute(query, params);
  };
  addToUsers = async (data) => {
    const query = `
    INSERT INTO Users (name,email,pass,type)
    VALUES (:name,:email,:pass,:type)
    `;
    const params = {
      name: data.name,
      email: data.email,
      pass: bcrypt.hashSync(data.pass, 10),
      type: data.type,
    };
    const res = await this.execute(query, params);
    if (res.success) {
      const result = await this.getUserByEmail(data.email);
      if (result.data.TYPE === "STUDENT") {
        return await this.addToStudents(result.data.USER_ID);
      } else {
        return await this.addToTutors(result.data.USER_ID);
      }
    }
    return res;
  };
  signup = async (data) => {
    const isTaken = await this.isEmailTaken(data.email);
    if (!isTaken) {
      const result = await this.addToUsers(data);
      return {
        success: result.success,
      };
    }
    console.log("ALREADY TAKEN");
    return {
      success: false,
      error: "Email is already taken",
    };
  };
  getToken = (id, email, pass, type) => {
    const token = jwt.sign(
      {
        id: id,
        email: email,
        pass: pass,
        type: type,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${tokenExpiryDuration}s` }
    );
    return token;
  };
  login = async (data) => {
    console.log(data);
    const result = await this.getUserByEmail(data.email);
    if (result.success) {
      const pass = result.data.PASS;
      if (bcrypt.compareSync(data.pass, pass)) {
        //signing a token with necessary information for validation
        return {
          success: true,
          token: this.getToken(
            result.data.USER_ID,
            data.email,
            pass,
            data.type
          ),
        };
      }
    }
    return {
      success: false,
    };
  };
  updatePass = async (pass, id) => {
    const query = `
    UPDATE Users
    SET pass = :pass
    where user_id = :id
    `;
    const newPassHash = bcrypt.hashSync(pass, 10);
    const params = {
      pass: newPassHash,
      id: id,
    };
    await this.execute(query, params);
    return newPassHash;
  };
  changePass = async (data) => {
    const result = await this.getUserByID(data.user_id);
    if (result.success) {
      const pass = result.data.PASS;
      if (bcrypt.compareSync(data.curr_pass, pass)) {
        const newPassHash = await this.updatePass(data.new_pass, data.user_id);
        return {
          success: true,
          token: this.getToken(
            result.data.USER_ID,
            result.data.EMAIL,
            newPassHash,
            result.data.TYPE
          ),
        };
      }
    }
    return {
      success: false,
    };
  };
  tokenValidity = async (id, email, pass) => {
    const query = `
    SELECT *
    FROM Users
    WHERE user_id = :id
    AND email = :email
    AND pass = :pass
    `;
    const params = { id: id, email: email, pass: pass };
    const result = await this.execute(query, params);
    // console.log("ALL:", id, email, pass);
    // console.log(result);
    if (result.success && result.data.length == 1) {
      return true;
    }
    return false;
  };
}

module.exports = AuthRepository;
