const Repository = require("./connection");

class CourseRepository extends Repository {
  constructor() {
    super();
  }
  getCourseId = async (data) => {
    const query = `
      SELECT course_id
      FROM Courses  
      WHERE coaching_id = :coaching_id
      AND class = :class
      AND subject = :subject
    `;
    const params = {
      coaching_id: data.coaching_id,
      class: data.class,
      subject: data.subject,
    };
    const result = await this.execute(query, params);
    // console.log(result);
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
  // getLastCourse = async () => {
  //   const query = `
  //     SELECT course_id
  //     FROM Courses
  //   `;
  //   const params = {};
  //   const result = await this.execute(query, params);
  //   // console.log(result.data[result.data.length - 1]);
  //   return result.data[result.data.length - 1];
  // };
  addBatch = async (data) => {
    // console.log(data.batch);
    const query = `
      INSERT INTO Batches (course_id,start_date,seats,class_days,class_time)
      VALUES(:course_id,TO_DATE(:start_date,'MM/DD/YYYY'),:seats,:class_days,:class_time)
    `;
    const params = {
      course_id: data.course_id,
      start_date: data.batch.start,
      seats: data.batch.seats,
      class_days: data.batch.days,
      class_time: data.batch.time,
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
  create = async (data) => {
    // const batch = await this.addBatch(data);
    const query = `
    INSERT INTO Courses (coaching_id,class,subject)
    VALUES(:coaching_id,:class,:subject)
    `;
    const params = {
      coaching_id: data.coaching_id,
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
    // console.log("JOIN:", data);
    const query = `
    INSERT INTO EnrolledIn
    VALUES(:user_id,:course_id,:batch_id)
  `;
    const params = {
      user_id: data.user_id,
      course_id: data.course_id,
      batch_id: data.batch_id,
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

  getMyListAdmin = async (data) => {
    const query = `
      SELECT *
      FROM MemberOf NATURAL JOIN Coachings NATURAL JOIN Courses
      WHERE user_id = :id AND type = 'ADMIN'
    `;
    const params = { id: data.user_id };
    const result = await this.execute(query, params);
    // console.log(result.data);
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

  getClassOptions = async (data) => {
    // console.log(data);
    const query = `
      SELECT DISTINCT class
      FROM Courses 
      WHERE coaching_id = :coaching_id
    `;
    const params = { coaching_id: data.coaching_id };
    const result = await this.execute(query, params);
    // console.log(result);
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
  getSubjectOptions = async (data) => {
    const query = `
      SELECT DISTINCT subject
      FROM Courses 
      WHERE coaching_id = :coaching_id
      AND class = :class
    `;
    const params = { coaching_id: data.coaching_id, class: data.class };
    const result = await this.execute(query, params);
    // console.log(result);
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
  getBatchOptions = async (data) => {
    const query = `
      SELECT *
      FROM Courses NATURAL JOIN Batches 
      WHERE coaching_id = :coaching_id
      AND class = :class
      AND subject = :subject
    `;
    const params = {
      coaching_id: data.coaching_id,
      class: data.class,
      subject: data.subject,
    };
    const result = await this.execute(query, params);
    // console.log(result);
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

  getStudents = async (data) => {
    let query = `
    SELECT DISTINCT user_id, S.class, gender, version, institution, phone_number, address,image,name
    FROM EnrolledIn NATURAL JOIN Courses NATURAL JOIN Batches 
    JOIN Students S
    ON user_id = student_id
    NATURAL JOIN Users
    WHERE coaching_id = :coaching_id
    `;
    let params = { coaching_id: data.coaching };
    if (data.class !== null) {
      query = query.concat(`
      AND C.class = :class
    `);
      params["class"] = data.class;
    } else if (data.subject !== null) {
      query = query.concat(`
      AND C.subject = :subject
    `);
      params["subject"] = data.subject;
    } else if (data.batch !== null) {
      query = query.concat(`
      AND C.batch_id = :batch_id
    `);
      params["batch_id"] = data.batch;
    }
    const result = await this.execute(query, params);

    // console.log("FILTERED", result);
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

  getBatches = async (data) => {
    const query = `
      SELECT *
      FROM Courses NATURAL JOIN Batches 
      WHERE course_id = :course_id
    `;
    const params = {
      course_id: data.course_id,
    };
    const result = await this.execute(query, params);
    // console.log(result);
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
    // console.log("Course req", data.user_id);
    const query = `
      SELECT *
      FROM EnrolledIn NATURAL JOIN Courses NATURAL JOIN Batches NATURAL JOIN Coachings
      WHERE student_id = :id
    `;
    const params = { id: data.user_id };
    const result = await this.execute(query, params);
    // console.log(result);
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
      if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
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

  // addCourse = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Applies>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // getCourses = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Applies>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };
}

module.exports = CourseRepository;
