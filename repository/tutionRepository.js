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
    return result;
  };
  getPosts = async (body) => {
    const query = `
    BEGIN
      :ret := GET_ALL_TUTION_POSTS(:id);
    END;
    `;
    const params = {
      id: body.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_POST_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getFilteredPosts = async (body) => {
    const query = `
    BEGIN
      :ret := GET_FILTERED_TUTION_POSTS(:id,:gender,:start,:end,:days,:version,:type,:class);
    END;
    `;
    const params = {
      id: body.user_id,
      gender: body.filter.gender,
      start: body.filter.start_salary,
      end: body.filter.end_salary,
      days: body.filter.days_per_week,
      version: body.filter.version,
      type: body.filter.type,
      class: body.filter.class,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_POST_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    console.log(result);
    return result;
  };
  getFilteredApplyList = async (data) => {
    const query = `
    BEGIN
      :ret := IS_APPLIED_FILTERED(:id,:gender,:start,:end,:days,:version,:type,:class);
    END;
    `;
    const params = {
      gender: data.filter.gender,
      start: data.filter.start_salary,
      end: data.filter.end_salary,
      days: data.filter.days_per_week,
      version: data.filter.version,
      id: data.user_id,
      type: data.filter.type,
      class: data.filter.class,
      ret: { dir: oracledb.BIND_OUT, type: "STRING_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
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
    return result;
  };
  offer = async (data) => {
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
  };

  getAllDetails = async (data) => {
    const query = `
      BEGIN
        :ret := GET_ALL_TUTIONS(:user_id);
      END;
    `;
    const params = {
      user_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getFilteredDetails = async (data) => {
    const query = `
      BEGIN
        :ret := GET_FILTERED_TUTIONS(:user_id,:gender,:start,:end,:status,:experience);
      END;
    `;
    const params = {
      user_id: data.user_id,
      gender: data.filter.gender,
      start: data.filter.start_salary,
      end: data.filter.end_salary,
      status: data.filter.status,
      experience: data.filter.experience,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
  };
  rate = async (data) => {
    const query = `
    BEGIN
      RATE(:student_id,:tutor_id,:rating);
    END;
   `;
    const params = {
      student_id: data.user_id,
      tutor_id: data.tutor_id,
      rating: data.rating,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
}

module.exports = TutionRepository;
