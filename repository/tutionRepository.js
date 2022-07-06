const Repository = require("./connection");

class TutionRepository extends Repository {
  constructor() {
    super();
  }
  getLastTution = async () => {
    const query = `
      SELECT tution_id
      FROM Tutions
    `;
    const params = {};
    const result = await this.execute(query, params);
    return result.data[result.data.length - 1];
  };
  addTution = async (data) => {
    const query = `
      INSERT INTO Tutions (subjects,salary,days_per_week,type)
      VALUES(:subjects,:salary,:days_per_week,:type)
    `;
    const params = {
      subjects: data.tution.subjects,
      salary: data.tution.salary,
      days_per_week: data.tution.days_per_week,
      type: data.tution.type,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
        data: await this.getLastTution(),
      };
    }
    return {
      success: false,
    };
  };
  post = async (data) => {
    // Insert details in Tuitions
    // Insert details in Tuition_Posts
    const tution = await this.addTution(data);
    const query = `
      INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender)
      VALUES(:student_id,:tution_id,:tutor_gender)
    `;
    const params = {
      student_id: data.user_id,
      tution_id: tution.data.TUTION_ID,
      tutor_gender: data.tution.desired_tutor_gender,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };

  getMyPosts = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    SELECT *
    FROM Tution_Posts NATURAL JOIN Tutions NATURAL JOIN Students JOIN Users
    ON student_id = user_id
    WHERE student_id = :id
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
  getPosts = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    SELECT *
    FROM Tution_Posts NATURAL JOIN Tutions NATURAL JOIN Students JOIN Users
    ON student_id = user_id 
    `;
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

  offer = async (data) => {
    // Insert details in Tuitions
    // Insert details in Tuition_Posts
    const tution = await this.addTution(data);
    const query = `
      INSERT INTO Offers (student_id, tutor_id, tution_id, status)
      VALUES(:student_id,:tutor_id,:tution_id,:status)
    `;
    const params = {
      student_id: data.user_id,
      tutor_id: data.tutor_id,
      tution_id: tution.data.TUTION_ID,
      status: "PENDING",
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  acceptOffer = async (data) => {
    const query = `
      UPDATE Offers
      SET status = 'ACCEPTED'
      WHERE tutor_id = :id AND student_id = :student_id
    `;
    const params = {
      id: data.user_id,
      student_id: data.student_id,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  rejectOffer = async (data) => {
    const query = `
      UPDATE Offers
      SET status = 'REJECTED'
      WHERE tutor_id = :id AND student_id = :student_id
    `;
    const params = {
      id: data.user_id,
      student_id: data.student_id,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };

  getMyOffers = async (data) => {
    // Get posts from Tuition_Posts
    const query = `
    SELECT *
    FROM Offers NATURAL JOIN Tutions NATURAL JOIN Students JOIN Users
    ON student_id = user_id
    WHERE tutor_id = :id AND status = 'PENDING'
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
  getOfferFromStudent = async (data) => {
    const query = `
    SELECT *
    FROM Offers NATURAL JOIN Tutions NATURAL JOIN Students JOIN Users
    ON student_id = user_id
    WHERE tutor_id = :id AND student_id = :student_id
    `;
    const params = { id: data.user_id, student_id: data.student_id };
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data[0],
      };
    }
    return {
      success: false,
    };
  };

  getOfferFromTutor = async (data) => {
    const query = `
      SELECT *
      FROM Offers O NATURAL JOIN Tutions JOIN Tutors T
      ON O.tutor_id = T.tutor_id
      JOIN Users U
      ON O.tutor_id = U.user_id
      WHERE O.student_id = :student_id AND O.status = 'ACCEPTED' AND O.tutor_id = :tutor_id
    `;
    const params = { tutor_id: data.tutor_id, student_id: data.user_id };
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data[0],
      };
    }
    return {
      success: false,
    };
  };

  getOfferFromPost = async (data) => {
    const query = `
    SELECT *
    FROM Tution_Posts NATURAL JOIN Tutions
    WHERE post_id = :post_id
    `;
    const params = { post_id: data.post_id };
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        data: result.data[0],
      };
    }
    return {
      success: false,
    };
  };

  apply = async (data) => {
    const query = `
      INSERT INTO Applies (tutor_id, post_id)
      VALUES(:tutor_id,:post_id)
    `;
    const params = {
      tutor_id: data.user_id,
      post_id: data.post_id,
    };
    const result = await this.execute(query, params);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };

  getApplicants = async (data) => {
    const query = `
      SELECT *
      FROM Applies A NATURAL JOIN Tution_Posts NATURAL JOIN Tutions JOIN Tutors T
      ON A.tutor_id = T.tutor_id
      JOIN Users
      ON T.tutor_id = user_id
      WHERE post_id = :post_id
    `;
    const params = { post_id: data.post_id };
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

module.exports = TutionRepository;
