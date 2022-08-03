const Repository = require("./connection");

class StudentsRepository extends Repository {
  constructor() {
    super();
  }
  getMyList = async (data) => {
    const query = `
        BEGIN
          :ret := GET_MY_STUDENTS(:id);
        END;
     `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data.ret,
      };
    }
    return {
      success: false,
    };
  };
  getPendingList = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    BEGIN
      :ret := GET_PENDING_STUDENTS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data.ret,
      };
    }
    return {
      success: false,
    };
  };
  getEnrolledList = async (data) => {
    console.log("--->", data);
    const query = `
    BEGIN
      :ret := GET_COURSE_STUDENTS(:coaching_id,:class,:subject,:batch_id);
    END;
    `;
    const params = {
      coaching_id: data.course.coaching,
      class: data.course.class === undefined ? null : data.course.class,
      subject: data.course.subject === undefined ? null : data.course.subject,
      batch_id:
        data.course.batch_id === undefined ? null : data.course.batch_id,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT_ARRAY" },
    };
    const result = await this.execute_pl(query, params);

    console.log("FILTERED", result, query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data.ret,
      };
    }
    return {
      success: false,
    };
  };
  getMembersList = async (data) => {
    let query = `
    BEGIN
      :ret := GET_COACHING_STUDENTS(:coaching_id);
    END;
    `;
    let params = {
      coaching_id: data.coaching_id,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT_ARRAY" },
    };
    let result = await this.execute_pl(query, params);
    console.log("COACHING:", result);
    if (result.success) {
      return {
        success: true,
        data: result.data.ret,
      };
    }
    return {
      success: false,
    };
  };
}

module.exports = StudentsRepository;
