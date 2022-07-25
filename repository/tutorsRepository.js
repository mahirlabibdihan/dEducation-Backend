const Repository = require("./connection");

class TutorsRepository extends Repository {
  constructor() {
    super();
  }
  getList = async (data) => {
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
}

module.exports = TutorsRepository;
