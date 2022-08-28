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
    return result;
  };
  getPendingList = async (data) => {
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
    return result;
  };
  getEnrolledList = async (data) => {
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
    return result;
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
    return result;
  };
  getJoinRequests = async (data) => {
    let query = `
    BEGIN
      :ret := GET_JOIN_REQUESTS(:coaching_id);
    END;
    `;
    let params = {
      coaching_id: data.coaching_id,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT_ARRAY" },
    };
    let result = await this.execute_pl(query, params);
    return result;
  };
  getPendingEnrollments = async (data) => {
    // console.log(data.course);
    let query = `
    BEGIN
      :ret := GET_PENDING_ENROLLMENTS(:coaching_id,:class,:subject,:batch_id);
    END;
    `;
    let params = {
      coaching_id: data.course.coaching,
      class: data.course.class === undefined ? null : data.course.class,
      subject: data.course.subject === undefined ? null : data.course.subject,
      batch_id: data.course.batch === undefined ? null : data.course.batch,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT_ARRAY" },
    };
    let result = await this.execute_pl(query, params);
    return result;
  };
}

module.exports = StudentsRepository;
