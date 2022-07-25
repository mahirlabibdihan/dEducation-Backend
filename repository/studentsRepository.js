const Repository = require("./connection");

class StudentsRepository extends Repository {
  constructor() {
    super();
  }
  getMyList = async (data) => {
    const query = `
        BEGIN
          :ret := GET_MY_STUDENTS(:id);
        END;
     `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "STUDENT_ARRAY" },
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

module.exports = StudentsRepository;
