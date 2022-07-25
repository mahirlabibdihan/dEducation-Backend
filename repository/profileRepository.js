const Repository = require("./connection");
const AuthRepository = require("./authRepository");
const authRepository = new AuthRepository();

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
    return {
      success: true,
      data: result.data.ret,
    };
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
    return {
      success: true,
      data: result.data.ret,
    };
  };
  getProfile = async (data) => {
    if (data.type === "STUDENT") {
      return await this.getStudentProfile(data.user_id);
    } else {
      return await this.getTutorProfile(data.user_id);
    }
  };
  // getProfileByID = async (data) => {
  //   const result = await authRepository.getUserByID(data.profile_id);

  //   if (result.success === true) {
  //     if (result.data.ROLE === "STUDENT") {
  //       return await this.getStudentProfile(data.profile_id);
  //     } else {
  //       return await this.getTutorProfile(data.profile_id);
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };
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
    return await this.execute_pl(query, params);
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
    return await this.execute_pl(query, params);
  };
  setProfile = async (data) => {
    const result = await (data.ROLE == "STUDENT"
      ? this.setStudentProfile(data)
      : this.setTutorProfile(data));
    if (result.success === true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  // getProfilePicture = async (data) => {
  //   const result = await authRepository.getUserByID(data.user_id);
  //   if (result.success === true) {
  //     return {
  //       success: true,
  //       data: {
  //         image: result.data.IMAGE,
  //       },
  //     };
  //   }
  //   return {
  //     success: false,
  //   };
  // };
  setProfilePicture = async (data) => {
    const fileName = data.user_id + Date.now() + "." + data.ext;
    const query = `
    BEGIN
      CHANGE_PROFILE_PICTURE(:id,:image);
    END;
    `;
    const params = { image: fileName, id: data.user_id };
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        image: fileName,
      };
    }
    return result;
  };
}

module.exports = ProfileRepository;
