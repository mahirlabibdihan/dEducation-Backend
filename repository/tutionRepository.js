const Repository = require("./connection");

class TutionRepository extends Repository {
  constructor() {
    super();
  }
  getLastTution = async () => {
    const query = `
      SELECT tution_id
      FROM Tutions
    `;
    const params = {};
    const result = await this.execute(query, params);
    return result.data[result.data.length - 1];
  };
  addTution = async (data) => {
    console.log("ADD TUTION");
    const query = `
      INSERT INTO Tutions (subjects,salary,days_per_week,type)
      VALUES(:subjects,:salary,:days_per_week,:type)
    `;
    const params = {
      subjects: data.tution.subjects,
      salary: data.tution.salary,
      days_per_week: data.tution.days_per_week,
      type: data.tution.type,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
        data: await this.getLastTution(),
      };
    }
    return {
      success: false,
    };
  };
  post = async (data) => {
    // Insert details in Tuitions
    // Insert details in Tuition_Posts
    const tution = await this.addTution(data);
    console.log("ADD TUTION POST");
    const query = `
      INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender)
      VALUES(:student_id,:tution_id,:tutor_gender)
    `;
    const params = {
      student_id: data.user_id,
      tution_id: tution.data.TUTION_ID,
      tutor_gender: data.tution.desired_tutor_gender,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };

  getMyPosts = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    SELECT *
    FROM Tution_Posts NATURAL JOIN Tutions NATURAL JOIN Students JOIN Users
    ON student_id = user_id
    WHERE student_id = :id
    `;
    const params = { id: data.user_id };
    const result = await this.execute(query, params);
    console.log("TUTION POST", result.data);
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }
    return {
      success: false,
    };
  };
  getPosts = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    SELECT *
    FROM Tution_Posts NATURAL JOIN Tutions NATURAL JOIN Students JOIN Users
    ON student_id = user_id 
    `;
    const params = {};
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }
    return {
      success: false,
    };
  };

  offer = async (data) => {
    // Insert details in Tuition
    // Insert details in Offers
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

  getOffers = async (data) => {
    // Select from Offers
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

  apply = async (data) => {
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

  getApplications = async (data) => {
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

module.exports = TutionRepository;
