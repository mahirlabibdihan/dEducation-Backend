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
    // console.log(result.data);
    return result;
  };
  uploadMaterial = async (data) => {
    const query = `
      BEGIN
        UPLOAD_MATERIAL(:id,:type,:description,:link);
      END;
    `;
    const params = {
      id: data.user_id,
      type: "Video",
      description: data.description,
      link: data.link,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getMyMaterials = async (data) => {
    const query = `
      BEGIN
        :ret := GET_TUTOR_MATERIALS(:id);
      END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "MATERIAL_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getAllMaterials = async () => {
    const query = `
      BEGIN
        :ret := GET_ALL_MATERIALS();
      END;
    `;
    const params = {
      ret: { dir: oracledb.BIND_OUT, type: "MATERIAL_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
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
    return result;
  };
  getEducationsList = async () => {
    // console.log("Educa");
    const query = `
      BEGIN
        :ret := GET_ALL_EDUCATIONS();
      END;
    `;
    const params = {
      ret: { dir: oracledb.BIND_OUT, type: "EDUCATION_2D_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getEducation = async (data) => {
    // console.log("EDUCATION");
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
    return result;
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
    return result;
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
    return result;
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
    return result;
  };
}

module.exports = TutorsRepository;
