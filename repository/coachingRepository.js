const Repository = require("./connection");

class CoachingRepository extends Repository {
  constructor() {
    super();
  }
  create = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "STUDENT") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Tuition_Posts>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  getInfo = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "STUDENT") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Tuition_Posts>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  joinRequest = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "STUDENT") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Offers>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  getRequests = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "STUDENT") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Offers>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  addMember = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "TUTOR") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Applies>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  getMembers = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "TUTOR") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Applies>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  addCourse = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "TUTOR") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Applies>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  getCourses = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "TUTOR") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Applies>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  assignCourse = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "TUTOR") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Applies>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };

  getAssignments = async (data) => {
    let query = "SELECT * from Users where user_id = :id";
    let params = { id: data.user_id };
    let result = await this.execute(query, params);
    if (result.success == true) {
      if (result.data.length == 1 && result.data[0].TYPE === "TUTOR") {
        // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
        const query = `<Insert tuition in Applies>`;
        const params = {};
        const result = await this.execute(query, params);
        return result;
      }
    }
    return {
      success: false,
    };
  };
}

module.exports = CoachingRepository;
