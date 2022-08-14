const Repository = require("./connection");

class CoachingRepository extends Repository {
  constructor() {
    super();
  }
  create = async (data) => {
    const query = `
    BEGIN
      CREATE_COACHING(:tutor_id, :name,:phone,:address);
    END;
    `;
    const params = {
      tutor_id: data.user_id,
      name: data.coaching.name,
      phone: data.coaching.phone,
      address: data.coaching.address,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  approveJoinRequest = async (body) => {
    // console.log("JOIN:", data);
    const query = `
    BEGIN
      APPROVE_JOIN_REQUEST(:coaching_id,:student_id);
    END;
  `;
    const params = {
      coaching_id: body.coaching_id,
      student_id: body.student_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  declineJoinRequest = async (body) => {
    // console.log("JOIN:", data);
    const query = `
    BEGIN
      DECLINE_JOIN_REQUEST(:coaching_id,:student_id);
    END;
  `;
    const params = {
      coaching_id: data.coaching_id,
      student_id: body.student_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  cancelJoinRequest = async (body) => {
    // console.log("JOIN:", data);
    const query = `
    BEGIN
      CANCEL_JOIN_REQUEST(:coaching_id,:student_id);
    END;
  `;
    const params = {
      coaching_id: body.coaching_id,
      student_id: body.user_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  joinCoaching = async (data) => {
    // console.log("JOIN:", data);
    const query = `
    BEGIN
      JOIN_COACHING(:user_id,:coaching_id);
    END;
  `;
    const params = {
      user_id: data.user_id,
      coaching_id: data.coaching_id,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getList = async (body) => {
    const query = `
    BEGIN
      :ret := GET_ALL_COACHINGS(:id);
    END;
    `;
    const params = {
      id: body.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "COACHING_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    // console.log(result);
    return result;
  };
  getJoinList = async (data) => {
    const query = `
    BEGIN
      :ret := IS_JOINED(:student_id);
    END;
    `;
    const params = {
      student_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "STRING_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };

  getMyList = async (data) => {
    const query = `
    BEGIN
      :ret := GET_MY_COACHINGS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "COACHING_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getMyNotices = async (data) => {
    const query = `
    BEGIN
      :ret := ${
        data.type === "TUTOR"
          ? "GET_ADMIN_NOTICES(:id)"
          : "GET_MEMBER_NOTICES(:id)"
      };
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "NOTICE_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  postNotice = async (body) => {
    const query = `
    BEGIN
      POST_NOTICE(:id,:coaching_id,:class,:subject,:batch_id,:text);
    END;
    `;
    const params = {
      id: body.user_id,
      coaching_id: body.data.coaching,
      class: body.data.class,
      subject: body.data.subject,
      batch_id: body.data.batch_id === undefined ? -1 : body.data.batch_id,
      text: body.data.notice,
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  getCourseList = async (data) => {
    const query = `
    BEGIN
      :ret := GET_COACHING_COURSES(:id);
    END;
    `;
    const params = {
      id: data.coaching_id,
      ret: { dir: oracledb.BIND_OUT, type: "COURSE_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    return result;
  };
  updateInfo = async (data) => {
    const query = `
    BEGIN
      UPDATE_COACHING_INFO(:coaching_id,:name,:phone_number,:address);
    END;
    `;
    const params = {
      name: data.name,
      phone_number: data.phone,
      address: data.address,
      coaching_id: data.coaching_id,
    };
    let result = await this.execute_pl(query, params);
    return result;
  };
  getInfo = async (data) => {
    let query = `
    BEGIN
      :ret := GET_COACHING_DETAILS(:coaching_id);
    END;
    `;
    let params = {
      coaching_id: data.coaching_id,
      ret: { dir: oracledb.BIND_OUT, type: "COACHING" },
    };
    let result = await this.execute_pl(query, params);
    return result;
  };

  setProfilePicture = async (data) => {
    const query = `
    BEGIN
      CHANGE_COACHING_PICTURE(:coaching_id,:image);
    END;
    `;
    const fileName = data.coaching_id + Date.now() + "." + data.ext;
    const params = { image: fileName, coaching_id: data.coaching_id };
    const result = await this.execute_pl(query, params);
    result["image"] = fileName;
    return result;
  };
}

module.exports = CoachingRepository;
