const Repository = require("./connection");
const AuthRepository = require("./authRepository");
const authRepository = new AuthRepository();

class ProfileRepository extends Repository {
  constructor() {
    super();
  }
  getStudentProfile = async (id) => {
    const query = `
    SELECT *
    FROM Users JOIN Students
    ON user_id = student_id
    WHERE user_id = :id
    `;
    const params = {
      id: id,
    };
    const result = await this.execute(query, params);
    return {
      success: true,
      data: result.data[0],
    };
  };
  getTutorProfile = async (id) => {
    const query = `
    SELECT *
    FROM Users JOIN Tutors
    ON user_id = tutor_id
    WHERE user_id = :id
    `;
    const params = {
      id: id,
    };
    const result = await this.execute(query, params);
    return {
      success: true,
      data: result.data[0],
    };
  };
  getProfile = async (data) => {
    const result = await authRepository.getUserByID(data.user_id);
    if (result.success === true) {
      if (result.data.TYPE === "STUDENT") {
        return await this.getStudentProfile(data.user_id);
      } else {
        return await this.getTutorProfile(data.user_id);
      }
    }
    return {
      success: false,
    };
  };
  getProfileByID = async (data) => {
    console.log("BY ID", data);
    const result = await authRepository.getUserByID(data.profile_id);
    console.log(result);
    if (result.success === true) {
      if (result.data.TYPE === "STUDENT") {
        return await this.getStudentProfile(data.profile_id);
      } else {
        return await this.getTutorProfile(data.profile_id);
      }
    }
    return {
      success: false,
    };
  };
  setStudentProfile = async (data) => {
    console.log("STUDENT UPDATE");
    const user = data.user;
    const query = `
    UPDATE Students 
    SET institution = :institution, version = :version, class = :class, address = :address
    WHERE student_id = :id
    `;
    const params = {
      institution: user.institution,
      version: user.version,
      class: user.class,
      address: user.address,
      id: data.user_id,
    };
    const result = await this.execute(query, params);
    console.log(result, user.institution);
    return result;
  };
  setTutorProfile = async (data) => {
    const user = data.user;
    const query = `
    UPDATE Tutors 
    SET status = :status, years_of_experience = :experience, preffered_salary = :salary, subjects = :subjects
    WHERE tutor_id = :id
    `;
    const params = {
      subjects: user.subjects,
      status: user.status,
      experience: user.experience,
      salary: user.salary,
      id: data.user_id,
    };
    return await this.execute(query, params);
  };
  setProfile = async (data) => {
    const user = data.user;
    const auth = await authRepository.getUserByID(data.user_id);
    const query = `
    UPDATE Users 
    SET name = :name, phone_number = :phone_number, date_of_birth = :dob, gender = :gender
    WHERE user_id = :id
    `;
    const params = {
      name: user.name,
      phone_number: user.phone,
      dob: user.dob,
      gender: user.gender,
      id: data.user_id,
    };
    const result = await this.execute(query, params);
    console.log(auth.data.TYPE, result);
    if (result.success) {
      if (auth.data.TYPE === "STUDENT") {
        return await this.setStudentProfile(data);
      } else {
        return await this.setTutorProfile(data);
      }
    }
    return result;
  };
  getProfilePicture = async (data) => {
    const result = await authRepository.getUserByID(data.user_id);
    console.log(result);
    if (result.success === true) {
      return {
        success: true,
        data: {
          image: result.data.IMAGE,
        },
      };
    }
    return {
      success: false,
    };
  };
  setProfilePicture = async (data) => {
    const query = `
    UPDATE Users
    SET image = :image
    WHERE user_id = :id
    `;
    const fileName = data.user_id + Date.now() + "." + data.ext;
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
