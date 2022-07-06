const Repository = require("./connection");

class StudentsRepository extends Repository {
  constructor() {
    super();
  }
  getMyList = async (data) => {
    const query = `
        SELECT *
        FROM Offers O NATURAL JOIN Tutions T NATURAL JOIN Students S JOIN Users U
        ON student_id = U.user_id
        WHERE tutor_id = :id AND status = 'ACCEPTED'
     `;
    const params = { id: data.user_id };
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

module.exports = StudentsRepository;
