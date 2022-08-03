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
    BEGIN
      ENROLL_COURSE(:user_id,:batch_id);
    END;
    `;
    const params = {
      user_id: data.user_id,
      batch_id: data.batch_id,
    };
    const result = await this.execute_pl(query, params);
    console.log(result);
    if (result.success) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
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
    console.log(result);
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
    // console.log(result);
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
    // console.log(result);
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
    // console.log(result);
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
    // console.log(result);
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
    // console.log(result.data);
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

module.exports = CourseRepository;
