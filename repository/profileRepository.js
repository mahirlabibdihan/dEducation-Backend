const Repository = require("./connection");

class ProfileRepository extends Repository {
  constructor() {
    super();
  }
  getStudentProfile = async (id) => {
    const query = `
    BEGIN
      :ret := GET_STUDENT_DETAILS(:id);
    END;
    `;
    const params = {
      id: id,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getSchedule = async (data) => {
    const query = `
      BEGIN
        :ret := ${
          data.type === "STUDENT"
            ? "GET_STUDENT_SCHEDULE(:user_id);"
            : "GET_TUTOR_SCHEDULE(:user_id);"
        }
      END;
    `;
    const params = {
      user_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "SCHEDULE_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getAllSchedule = async (data) => {
    const query = `
      BEGIN
        :ret := ${
          data.type === "STUDENT"
            ? "GET_STUDENT_ALL_SCHEDULE(:user_id);"
            : "GET_TUTOR_ALL_SCHEDULE(:user_id);"
        }
      END;
    `;
    const params = {
      user_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "SCHEDULE_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getTutorProfile = async (id) => {
    const query = `
    BEGIN
      :ret := GET_TUTOR_DETAILS(:id);
    END;
    `;
    const params = {
      id: id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTOR" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getProfile = async (data) => {
    if (data.type === "STUDENT") {
      return await this.getStudentProfile(data.user_id);
    } else {
      return await this.getTutorProfile(data.user_id);
    }
  };
  getEducation = async (data) => {
    const query = `
    BEGIN
      :ret := GET_EDUCATIONS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "EDUCATION_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getNotifications = async (data) => {
    const query = `
    BEGIN
      :ret := GET_NOTIFICATIONS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "NOTIFICATION_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  seenNotifications = async (data) => {
    const query = `
    BEGIN
      SEEN_NOTIFICATIONS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  addEducation = async (data) => {
    const query = `
    BEGIN
      ADD_EDUCATION(:tutor_id,:institute,:field,:degree,:passing_year);
    END;
    `;
    const params = {
      tutor_id: data.user_id,
      institute: data.institute,
      field: data.field_of_study,
      degree: data.degree,
      passing_year: data.passing_year,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  updateEducation = async (data) => {
    const query = `
    BEGIN
      UPDATE_EDUCATION(:eq_id,:tutor_id,:institute,:field,:degree,:passing_year);
    END;
    `;
    const params = {
      eq_id: data.eq_id,
      tutor_id: data.user_id,
      institute: data.institute,
      field: data.field_of_study,
      degree: data.degree,
      passing_year: data.passing_year,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  deleteEducation = async (eq_id) => {
    const query = `
    BEGIN
      DELETE_EDUCATION(:eq_id);
    END;
    `;
    const params = {
      eq_id: eq_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };

  setStudentProfile = async (data) => {
    const user = data.user;
    const query = `
      BEGIN
        UPDATE_STUDENT_PROFILE(:id, :name, :phone_number, :dob, :gender, :institution, :version, :class, :address);
      END;
    `;
    const params = {
      id: data.user_id,
      name: user.name,
      phone_number: user.phone,
      dob: user.dob,
      gender: user.gender,
      institution: user.institution,
      version: user.version,
      class: user.class,
      address: user.address,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  setTutorProfile = async (data) => {
    const user = data.user;
    const query = `
      BEGIN
        UPDATE_TUTOR_PROFILE(:id, :name, :phone_number, :dob, :gender, :status, :experience, :salary, :subjects);
      END;
    `;
    const params = {
      id: data.user_id,
      name: user.name,
      phone_number: user.phone,
      dob: user.dob,
      gender: user.gender,
      subjects: user.subjects,
      status: user.status,
      experience: user.experience,
      salary: user.salary,
      id: data.user_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };

  setProfilePicture = async (data) => {
    const fileName = data.user_id + Date.now() + "." + data.ext;
    const query = `
    BEGIN
      CHANGE_PROFILE_PICTURE(:id,:image);
    END;
    `;
    const params = { image: fileName, id: data.user_id };
    const result = await this.execute_pl(query, params);
    result["image"] = fileName;
    return result;
  };
}

module.exports = ProfileRepository;
