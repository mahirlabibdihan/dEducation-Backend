const Repository = require("./connection");

class profileRepository extends Repository {
  constructor() {
    super();
  }
  getProfile = async (data) => {
    const query = `
    SELECT name,image,type
    FROM Users
    WHERE user_id=:id`;
    const params = {
      id: data.user_id,
    };
    var result = await this.execute(query, params);
    console.log(result);
    if (result.success === true) {
      return {
        success: true,
        data: {
          name: result.data[0].NAME,
          image: result.data[0].IMAGE,
          type: result.data[0].TYPE,
        },
      };
    }
    return {
      success: false,
    };
  };
  setProfilePicture = async (data) => {
    const query = "UPDATE Users SET image = :image where user_id = :id";
    const fileName = data.user_id + Date.now() + "." + data.ext;
    const params = { image: fileName, id: data.user_id };
    const result = await this.execute(query, params);
    if (result.success === true) {
      return {
        success: true,
        image: fileName,
      };
    }
    return {
      success: false,
    };
  };
  getProfilePicture = async (data) => {
    const query = "SELECT image FROM Users WHERE user_id = :id";
    const params = { id: data.user_id };
    const result = await this.execute(query, params);
    console.log("PRO", result);
    if (result.success === true) {
      return {
        success: true,
        image: result.data[0].IMAGE,
      };
    }
    return {
      success: false,
    };
  };
}

module.exports = profileRepository;
