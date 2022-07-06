const Repository = require("./connection");

class CoachingRepository extends Repository {
  constructor() {
    super();
  }
  getLastCoaching = async () => {
    const query = `
      SELECT coaching_id
      FROM Coachings  
    `;
    const params = {};
    const result = await this.execute(query, params);
    console.log(result.data[result.data.length - 1]);
    return result.data[result.data.length - 1];
  };
  addAdmin = async (user_id, coaching_id) => {
    const query = `
      INSERT INTO MemberOf
      VALUES(:user_id,:coaching_id,'ADMIN')
    `;
    const params = {
      user_id: user_id,
      coaching_id: coaching_id,
    };
    const result = await this.execute(query, params);
  };
  create = async (data) => {
    const query = `
    INSERT INTO Coachings(name,phone_number,address)
    VALUES(:name,:phone,:address)
    `;
    const params = {
      name: data.coaching.name,
      phone: data.coaching.phone,
      address: data.coaching.address,
    };
    const result = await this.execute(query, params);
    if (result.success) {
      const coaching = await this.getLastCoaching();
      const result2 = await this.addAdmin(data.user_id, coaching.COACHING_ID);
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  joinCoaching = async (data) => {
    console.log("JOIN:", data);
    const query = `
    INSERT INTO MemberOf
    VALUES(:user_id,:coaching_id,'MEMBER')
  `;
    const params = {
      user_id: data.user_id,
      coaching_id: data.coaching_id,
    };
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  getList = async () => {
    const query = `
    SELECT *
    FROM Coachings
    `;
    // name, image, gender, phone_number, status, years_of_experience, preferred_salary
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

  getMyList = async (data) => {
    const query = `
      SELECT *
      FROM MemberOf NATURAL JOIN Coachings
      WHERE user_id = :id AND (type = 'MEMBER'  OR type = 'ADMIN')
    `;
    // name, image, gender, phone_number, status, years_of_experience, preferred_salary
    const params = { id: data.user_id };
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

  getInfo = async (data) => {
    let query = `
    SELECT *
    FROM Coachings
    WHERE coaching_id = :coaching_id
    `;
    let params = { coaching_id: data.coaching_id };
    let result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data[0],
      };
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
