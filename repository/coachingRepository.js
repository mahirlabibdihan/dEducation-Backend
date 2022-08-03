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
    if (result.success) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
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
    if (result.success) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  getList = async () => {
    const query = `
    BEGIN
      :ret := GET_ALL_COACHINGS();
    END;
    `;
    const params = {
      ret: { dir: oracledb.BIND_OUT, type: "COACHING_ARRAY" },
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
    if (result.success) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
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
    console.log(data.coaching_id);
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

  setProfilePicture = async (data) => {
    console.log(data);
    const query = `
    BEGIN
      CHANGE_COACHING_PICTURE(:coaching_id,:image);
    END;
    `;
    const fileName = data.coaching_id + Date.now() + "." + data.ext;
    const params = { image: fileName, coaching_id: data.coaching_id };
    const result = await this.execute_pl(query, params);
    if (result.success) {
      return {
        success: true,
        image: fileName,
      };
    }
    return result;
  };
}

module.exports = CoachingRepository;
