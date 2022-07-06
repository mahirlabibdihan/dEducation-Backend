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
  getMyList = async (data) => {
    // Get posts from Tuition_Posts
    console.log("----", data);
    const query = `
      SELECT *
      FROM Offers O NATURAL JOIN Tutions JOIN Tutors T
      ON O.tutor_id = T.tutor_id
      JOIN Users U
      ON O.tutor_id = U.user_id
      WHERE O.student_id = :id AND O.status = 'ACCEPTED'
     `;
    const params = { id: data.user_id };
    const result = await this.execute(query, params);
    console.log("TUTION POST", result.data);
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
