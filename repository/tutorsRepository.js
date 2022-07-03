const Repository = require("./connection");

class TutorsRepository extends Repository {
  constructor() {
    super();
  }
  getList = async () => {
    const query = `
    SELECT *
    FROM Users U JOIN Tutors T
    ON U.user_id = T.tutor_id
    `;
    // name, image, gender, phone_number, status, years_of_experience, preferred_salary
    const params = {};
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    }
    return {
      success: false,
    };
  };
}

module.exports = TutorsRepository;
