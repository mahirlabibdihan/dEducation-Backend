const Repository = require("./connection");

class CourseRepository extends Repository {
  constructor() {
    super();
  }

  addBatch = async (data) => {
    // console.log(data.batch);
    const query = `
      BEGIN
        CREATE_BATCH(:course_id,:start_date,:seats,:class_days,:class_time);
      END;
    `;
    const params = {
      course_id: data.course_id,
      start_date: data.batch.start,
      seats: data.batch.seats,
      class_days: data.batch.days,
      class_time: data.batch.time,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  create = async (data) => {
    // const batch = await this.addBatch(data);
    const query = `
    BEGIN
      CREATE_COURSE(:coaching_id,:class,:subject);
    END;
    `;
    const params = {
      coaching_id: data.coaching_id,
      class: data.class,
      subject: data.subject,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  enroll = async (data) => {
    // console.log("JOIN:", data);
    const query = `
    BEGIN
      ENROLL_COURSE(:user_id,:batch_id);
    END;
    `;
    const params = {
      user_id: data.user_id,
      batch_id: data.batch_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };

  getClassOptions = async (data) => {
    // console.log(data);
    const query = `
      BEGIN
        :ret := GET_CLASS_OPTIONS(:coaching_id);
      END;
    `;
    const params = {
      coaching_id: data.coaching_id,
      ret: { dir: oracledb.BIND_OUT, type: "STRING_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getSubjectOptions = async (data) => {
    const query = `
      BEGIN
        :ret := GET_SUBJECT_OPTIONS(:coaching_id,:class);
      END;
    `;
    const params = {
      coaching_id: data.coaching_id,
      class: data.class,
      ret: { dir: oracledb.BIND_OUT, type: "STRING_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getBatchOptions = async (data) => {
    const query = `
      BEGIN 
       :ret := GET_BATCH_OPTIONS(:coaching_id,:class,:subject);
      END;
    `;
    const params = {
      coaching_id: data.coaching_id,
      class: data.class,
      subject: data.subject,
      ret: { dir: oracledb.BIND_OUT, type: "BATCH_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };

  getBatches = async (data) => {
    const query = `
      BEGIN
        :ret := GET_BATCHES(:course_id);
      END;
    `;
    const params = {
      course_id: data.course_id,
      ret: { dir: oracledb.BIND_OUT, type: "BATCH_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getMyList = async (data) => {
    // console.log("Course req", data.user_id);
    const query = `
      BEGIN
        :ret := GET_MEMBER_COURSES(:id);
      END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "COURSE_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    console.log("Courses", result.data);
    return result;
  };

  getMyListAdmin = async (data) => {
    const query = `
    BEGIN
      :ret := GET_ADMIN_COURSES(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "COURSE_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
}

module.exports = CourseRepository;
