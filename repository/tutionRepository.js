const Repository = require("./connection");

class TutionRepository extends Repository {
  constructor() {
    super();
  }
  // getLastTution = async () => {
  //   const query = `
  //     SELECT tution_id
  //     FROM Tutions
  //   `;
  //   const params = {};
  //   const result = await this.execute(query, params);
  //   return result.data[result.data.length - 1];
  // };
  // addTution = async (data) => {
  //   const query = `
  //     INSERT INTO Tutions (subjects,salary,days_per_week,type)
  //     VALUES(:subjects,:salary,:days_per_week,:type)
  //   `;
  //   const params = {
  //     subjects: data.tution.subjects,
  //     salary: data.tution.salary,
  //     days_per_week: data.tution.days_per_week,
  //     type: data.tution.type,
  //   };
  //   const result = await this.execute(query, params);
  //   if (result.success == true) {
  //     return {
  //       success: true,
  //       data: await this.getLastTution(),
  //     };
  //   }
  //   return {
  //     success: false,
  //   };
  // };
  post = async (data) => {
    // Insert details in Tuitions
    // Insert details in Tuition_Posts
    // const tution = await this.addTution(data);
    // const query = `
    //   INSERT INTO Tution_Posts (student_id,tution_id,desired_tutor_gender)
    //   VALUES(:student_id,:tution_id,:tutor_gender)
    // `;
    const query = `
      BEGIN
        POST_TUTION(:student_id,:tutor_gender,:subjects,:salary,:days_per_week,:type);
      END;
    `;
    const params = {
      student_id: data.user_id,
      tutor_gender: data.tution.desired_tutor_gender,
      subjects: data.tution.subjects,
      salary: data.tution.salary,
      days_per_week: data.tution.days_per_week,
      type: data.tution.type,
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
    BEGIN
      :ret := GET_MY_TUTION_POSTS(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_POST_ARRAY" },
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
  getPosts = async (data) => {
    const query = `
    BEGIN
      :ret := GET_ALL_TUTION_POSTS();
    END;
    `;
    const params = {
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_POST_ARRAY" },
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
  getApplyList = async (data) => {
    const query = `
    BEGIN
      :ret := IS_APPLIED(:id);
    END;
    `;
    const params = {
      id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "STRING_ARRAY" },
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

  offer = async (data) => {
    // Insert details in Tuitions
    // Insert details in Tuition_Posts
    // const tution = await this.addTution(data);
    const query = `
      BEGIN
        MAKE_OFFER(:student_id,:tutor_id,:subjects,:salary,:days_per_week,:type);
      END;
    `;
    const params = {
      student_id: data.user_id,
      tutor_id: data.tutor_id,
      subjects: data.tution.subjects,
      salary: data.tution.salary,
      days_per_week: data.tution.days_per_week,
      type: data.tution.type,
    };
    const result = await this.execute_pl(query, params);
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
      DELETE FROM Offers
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
  cancelOffer = async (data) => {
    const query = `
      DELETE FROM Offers
      WHERE tutor_id = :tutor_id AND student_id = :id
    `;
    const params = {
      id: data.user_id,
      tutor_id: data.tutor_id,
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
    FROM Offers NATURAL JOIN Tutions 
    JOIN Students ON student_id = user_id
    NATURAL JOIN Users
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
    FROM Offers NATURAL JOIN Tutions 
    JOIN Students ON student_id = user_id
    NATURAL JOIN Users
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

  getAllDetails = async (data) => {
    const query = `
      BEGIN
        :ret := ${
          data.type === "STUDENT"
            ? "GET_TUTIONS_BY_STUDENT(:user_id);"
            : "GET_TUTIONS_BY_TUTOR(:user_id);"
        }
      END;
    `;
    const params = {
      user_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
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
  getMyDetails = async (data) => {
    const query = `
      BEGIN
        :ret := ${
          data.type === "STUDENT"
            ? "GET_MY_TUTIONS_BY_STUDENT(:user_id);"
            : "GET_MY_TUTIONS_BY_TUTOR(:user_id);"
        }
      END;
    `;
    const params = {
      user_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
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
  getTutionDetails = async (data) => {
    const query = `
      BEGIN
        :ret := GET_TUTION_DETAILS(:tutor_id,:student_id);
      END;
    `;
    const params = {
      tutor_id: data.type == "STUDENT" ? data.id : data.user_id,
      student_id: data.type == "STUDENT" ? data.user_id : data.id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION" },
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

  getOfferFromTutor = async (data) => {
    const query = `
      SELECT *
      FROM Offers NATURAL JOIN Tutions 
      JOIN Tutors ON tutor_id = user_id
      NATURAL JOIN Users U
      WHERE student_id = :student_id AND status = 'ACCEPTED' AND tutor_id = :tutor_id
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
    BEGIN
      APPLY_FOR_TUTION(:tutor_id,:post_id);
    END;
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
  cancelApplication = async (data) => {
    const query = `
    BEGIN
      CANCEL_APPLICATION(:tutor_id,:post_id);
    END;
    `;
    const params = {
      tutor_id: data.user_id,
      post_id: data.post_id,
    };
    const result = await this.execute_pl(query, params);
    if (result.success == true) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  };
  getApplicantsTutionDetails = async (data) => {
    const query = `
      BEGIN
        :ret := GET_APPLICANTS_TUTION_DETAILS(:post_id,:student_id);
      END;
    `;
    const params = {
      post_id: data.post_id,
      student_id: data.user_id,
      ret: { dir: oracledb.BIND_OUT, type: "TUTION_ARRAY" },
    };
    const result = await this.execute_pl(query, params);
    console.log(result.data.ret);
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

  getApplicants = async (data) => {
    const query = `
      BEGIN
        :ret := GET_ALL_APPLICANTS(:post_id);
      END;
    `;
    const params = {
      post_id: data.post_id,
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

  // getApplicants2 = async (data) => {
  //   // const query = `
  //   //   SELECT *
  //   //   FROM Applies A NATURAL JOIN Tution_Posts NATURAL JOIN Tutions JOIN Tutors T
  //   //   ON A.tutor_id = T.tutor_id
  //   //   JOIN Users
  //   //   ON T.tutor_id = user_id
  //   //   WHERE post_id = :post_id
  //   // `;
  //   const query = `
  //     SELECT name, image, gender, phone_number,
  //     user_id tutor_id, expertise, availability, years_of_experience, preffered_salary,
  //     status, subjects, salary, days_per_week, type
  //     FROM (
  //         SELECT tutor_id
  //         FROM Applies
  //         WHERE post_id = :post_id
  //         MINUS
  //         SELECT tutor_id
  //         FROM Offers
  //         WHERE student_id = :id
  //     ) NotOffered
  //     JOIN Tutors
  //     ON tutor_id = user_id
  //     NATURAL JOIN Users
  //     NATURAL JOIN Applies
  //     NATURAL JOIN Tution_Posts
  //     NATURAL JOIN Tutions T
  //     LEFT OUTER JOIN Offers O
  //     ON O.tutor_id = user_id
  //     AND O.student_id = :id
  //     UNION
  //     SELECT name, image, gender, phone_number,
  //     tutor_id, expertise, availability, years_of_experience, preffered_salary,
  //     status, subjects, salary, days_per_week, type
  //     FROM (
  //         SELECT tutor_id
  //         FROM Applies
  //         WHERE post_id = :post_id
  //         INTERSECT
  //         SELECT tutor_id
  //         FROM Offers
  //         WHERE student_id = :id
  //     ) Offered
  //     JOIN Tutors
  //     ON tutor_id = user_id
  //     NATURAL JOIN Users
  //     NATURAL JOIN Offers
  //     NATURAL JOIN Tutions
  //     WHERE student_id = :id
  //   `;
  //   const params = { id: data.user_id, post_id: data.post_id };
  //   const result = await this.execute(query, params);
  //   if (result.success) {
  //     return {
  //       success: true,
  //       data: result.data,
  //     };
  //   }
  //   return {
  //     success: false,
  //   };
  // };
}

module.exports = TutionRepository;
