const Repository = require("./connection");

class TutorsRepository extends Repository {
  constructor() {
    super();
  }
  getList = async () => {
    const query = `
      BEGIN
        :ret := GET_ALL_TUTORS();
      END;
    `;
    const params = {
      ret: { dir: oracledb.BIND_OUT, type: "TUTOR_ARRAY" },
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
  getFilteredList = async (filter) => {
    const query = `
      BEGIN
        :ret := GET_FILTERED_TUTORS(:gender,:start,:end,:status,:experience);
      END;
    `;
    const params = {
      gender: filter.gender,
      start: filter.start_salary,
      end: filter.end_salary,
      status: filter.status,
      experience: filter.experience,
      ret: { dir: oracledb.BIND_OUT, type: "TUTOR_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    console.log("-->", result, query, params);
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
  getEducationsList = async () => {
    console.log("Educa");
    const query = `
      BEGIN
        :ret := GET_ALL_EDUCATIONS();
      END;
    `;
    const params = {
      ret: { dir: oracledb.BIND_OUT, type: "EDUCATION_2D_ARRAY" },
    };
    console.log(query, params);
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
  getEducation = async (data) => {
    console.log("EDUCATION");
    const query = `
    BEGIN
      :ret := GET_EDUCATIONS(:id);
    END;
    `;
    const params = {
      id: data.tutor_id,
      ret: { dir: oracledb.BIND_OUT, type: "EDUCATION_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    console.log(query, params, result);
    return {
      success: true,
      data: result.data.ret,
    };
  };
  getFilteredEducationsList = async (filter) => {
    const query = `
      BEGIN
        :ret := GET_FILTERED_EDUCATIONS(:gender,:start,:end,:status,:experience);
      END;
    `;
    const params = {
      gender: filter.gender,
      start: filter.start_salary,
      end: filter.end_salary,
      status: filter.status,
      experience: filter.experience,
      ret: { dir: oracledb.BIND_OUT, type: "EDUCATION_2D_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    console.log("-->", result, query, params);
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
    const query = `
      BEGIN
        :ret := GET_MY_TUTORS(:id);
      END;
     `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTOR_ARRAY" },
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
  getApplicantsList = async (data) => {
    const query = `
      BEGIN
        :ret := GET_ALL_APPLICANTS(:post_id);
      END;
    `;
    const params = {
      post_id: data.post_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTOR_ARRAY" },
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
}

module.exports = TutorsRepository;
