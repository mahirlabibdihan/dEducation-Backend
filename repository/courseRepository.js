const Repository = require("./connection");

class CourseRepository extends Repository {
  constructor() {
    super();
  }
  getLastCourse = async () => {
    const query = `
      SELECT course_id
      FROM Courses  
    `;
    const params = {};
    const result = await this.execute(query, params);
    console.log(result.data[result.data.length - 1]);
    return result.data[result.data.length - 1];
  };
  addBatch = async (data) => {
    const query = `
      INSERT INTO Batches (start_date,seats,class_days,class_time)
      VALUES(:start,:seats,:days,:time)
    `;
    const params = {
      start: data.start,
      seats: data.seats,
      days: data.days,
      time: data.time,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
        data: await this.getLastCourse(),
      };
    }
    return {
      success: false,
    };
  };
  create = async (data) => {
    const batch = await this.addBatch(data);
    const query = `
    INSERT INTO Courses (coaching_id,batch_id,class,subject)
    VALUES(:coaching_id,:batch_id,:class,:subject);
    `;
    const params = {
      coaching_id: data.coaching_id,
      batch_id: batch.data.BATCH_ID,
      class: data.class,
      subject: data.subject,
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
  enroll = async (data) => {
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
      FROM EnrolledIn NATURAL JOIN Courses NATURAL JOIN Batches NATURAL JOIN COACHINGS
      WHERE student_id = :id
    `;
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
}

module.exports = CourseRepository;
