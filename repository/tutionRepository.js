const Repository = require("./connection");

class TutionRepository extends Repository {
  constructor() {
    super();
  }

  getMyPosts = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    BEGIN
      :ret := GET_MY_TUTION_POSTS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_POST_ARRAY" },
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
  getPosts = async (data) => {
    const query = `
    BEGIN
      :ret := GET_ALL_TUTION_POSTS();
    END;
    `;
    const params = {
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_POST_ARRAY" },
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
  getApplyList = async (data) => {
    const query = `
    BEGIN
      :ret := IS_APPLIED(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "STRING_ARRAY" },
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

  offer = async (data) => {
    // Insert details in Tuitions
    // Insert details in Tuition_Posts
    // const tution = await this.addTution(data);
    const query = `
      BEGIN
        MAKE_OFFER(:student_id,:tutor_id,:subjects,:salary,:days_per_week,:type);
      END;
    `;
    const params = {
      student_id: data.user_id,
      tutor_id: data.tutor_id,
      subjects: data.tution.subjects,
      salary: data.tution.salary,
      days_per_week: data.tution.days_per_week,
      type: data.tution.type,
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
  acceptOffer = async (data) => {
    const query = `
    BEGIN
      ACCEPT_OFFER(:tutor_id,:student_id);
    END;
    `;
    const params = {
      tutor_id: data.user_id,
      student_id: data.student_id,
    };
    const result = await this.execute_pl(query, params);
    console.log(result);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  rejectOffer = async (data) => {
    const query = `
    BEGIN
      DELETE_OFFER(:tutor_id,:student_id);
    END;
    `;
    const params = {
      tutor_id: data.user_id,
      student_id: data.student_id,
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
  cancelOffer = async (data) => {
    const query = `
      BEGIN
        DELETE_OFFER(:tutor_id,:student_id);
      END;
    `;
    const params = {
      student_id: data.user_id,
      tutor_id: data.tutor_id,
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

  getPendingDetails = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    BEGIN
      :ret :=  GET_PENDING_TUTIONS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
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

  getAllDetails = async (data) => {
    const query = `
      BEGIN
        :ret := ${
          data.type === "STUDENT"
            ? "GET_TUTIONS_BY_STUDENT(:user_id);"
            : "GET_TUTIONS_BY_TUTOR(:user_id);"
        }
      END;
    `;
    const params = {
      user_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
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
  getMyDetails = async (data) => {
    const query = `
      BEGIN
        :ret := ${
          data.type === "STUDENT"
            ? "GET_MY_TUTIONS_BY_STUDENT(:user_id);"
            : "GET_MY_TUTIONS_BY_TUTOR(:user_id);"
        }
      END;
    `;
    const params = {
      user_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
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
  getTutionDetails = async (data) => {
    const query = `
      BEGIN
        :ret := GET_TUTION_DETAILS(:tutor_id,:student_id);
      END;
    `;
    const params = {
      tutor_id: data.type == "STUDENT" ? data.id : data.user_id,
      student_id: data.type == "STUDENT" ? data.user_id : data.id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION" },
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
  apply = async (data) => {
    const query = `
    BEGIN
      APPLY_FOR_TUTION(:tutor_id,:post_id);
    END;
    `;
    const params = {
      tutor_id: data.user_id,
      post_id: data.post_id,
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
  cancelApplication = async (data) => {
    const query = `
    BEGIN
      CANCEL_APPLICATION(:tutor_id,:post_id);
    END;
    `;
    const params = {
      tutor_id: data.user_id,
      post_id: data.post_id,
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
  getApplicantsTutionDetails = async (data) => {
    const query = `
      BEGIN
        :ret := GET_APPLICANTS_TUTION_DETAILS(:post_id,:student_id);
      END;
    `;
    const params = {
      post_id: data.post_id,
      student_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    console.log(result.data.ret);
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

  post = async (data) => {
    const query = `
      BEGIN
        POST_TUTION(:student_id,:tutor_gender,:subjects,:salary,:days_per_week,:type);
      END;
    `;
    const params = {
      student_id: data.user_id,
      tutor_gender: data.tution.desired_tutor_gender,
      subjects: data.tution.subjects,
      salary: data.tution.salary,
      days_per_week: data.tution.days_per_week,
      type: data.tution.type,
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
}

module.exports = TutionRepository;
