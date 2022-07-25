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
    INSERT INTO MemberOf
    VALUES(:user_id,:coaching_id,'MEMBER')
  `;
    const params = {
      user_id: data.user_id,
      coaching_id: data.coaching_id,
    };
    const result = await this.execute(query, params);
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
    SELECT *
    FROM Coachings
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
    // console.log("COACHING", data);
    const query = `
      SELECT *
      FROM MemberOf NATURAL JOIN Coachings
      WHERE user_id = :id AND (type = 'MEMBER'  OR type = 'ADMIN')
    `;
    // name, image, gender, phone_number, status, years_of_experience, preferred_salary
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
  updateInfo = async (data) => {
    const query = `
    UPDATE Coachings 
    SET name = :name, phone_number = :phone_number, address = :address
    WHERE coaching_id = :coaching_id
    `;
    const params = {
      name: data.name,
      phone_number: data.phone,
      address: data.address,
      coaching_id: data.coaching_id,
    };
    let result = await this.execute(query, params);
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
    SELECT *
    FROM Coachings
    WHERE coaching_id = :coaching_id
    `;
    let params = { coaching_id: data.coaching_id };
    let result = await this.execute(query, params);
    console.log(data.coaching_id);
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

  getStudents = async (data) => {
    let query = `
    BEGIN
      GET_COACHING_STUDENTS(:coaching_id);
    END;
    `;
    let params = { coaching_id: data.coaching_id };
    let result = await this.execute(query, params);
    console.log("COACHING:", result);
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

  setProfilePicture = async (data) => {
    console.log(data);
    const query = `
    UPDATE Coachings
    SET image = :image
    WHERE coaching_id = :coaching_id
    `;
    const fileName = data.coaching_id + Date.now() + "." + data.ext;
    const params = { image: fileName, coaching_id: data.coaching_id };
    const result = await this.execute(query, params);
    if (result.success) {
      return {
        success: true,
        image: fileName,
      };
    }
    return result;
  };

  // getProfilePicture = async (data) => {
  //   console.log(data);
  //   const result = await this.getInfo(data);

  //   if (result.success === true) {
  //     return {
  //       success: true,
  //       data: {
  //         image: result.data.IMAGE,
  //       },
  //     };
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // getLastCoaching = async () => {
  //   const query = `
  //     SELECT coaching_id
  //     FROM Coachings
  //   `;
  //   const params = {};
  //   const result = await this.execute(query, params);
  //   // console.log(result.data[result.data.length - 1]);
  //   return result.data[result.data.length - 1];
  // };
  // addAdmin = async (user_id, coaching_id) => {
  //   const query = `
  //     INSERT INTO MemberOf
  //     VALUES(:user_id,:coaching_id,'ADMIN')
  //   `;
  //   const params = {
  //     user_id: user_id,
  //     coaching_id: coaching_id,
  //   };
  //   const result = await this.execute(query, params);
  // };

  // joinRequest = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "STUDENT") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Offers>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // getRequests = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "STUDENT") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Offers>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // addMember = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Applies>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // addCourse = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Applies>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // getCourses = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Applies>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // assignCourse = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Applies>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };

  // getAssignments = async (data) => {
  //   let query = "SELECT * from Users where user_id = :id";
  //   let params = { id: data.user_id };
  //   let result = await this.execute(query, params);
  //   if (result.success == true) {
  //     if (result.data.length == 1 && result.data[0].ROLE === "TUTOR") {
  //       // Data = {Requirements, Desired Tutor gender, Salary, Type, Days per week}
  //       const query = `<Insert tuition in Applies>`;
  //       const params = {};
  //       const result = await this.execute(query, params);
  //       return result;
  //     }
  //   }
  //   return {
  //     success: false,
  //   };
  // };
}

module.exports = CoachingRepository;
