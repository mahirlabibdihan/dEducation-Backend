const Repository = require("./connection");

class profileRepository extends Repository {
  constructor() {
    super();
  }
  getProfile = async (data) => {
    const query = `
    SELECT name,image
    FROM Users
    WHERE id=:id`;
    const params = {
      id: data.user_id,
    };
    var result = await this.execute(query, params);
    if (result.success === true) {
      return {
        success: true,
        data: {
          name: result.data[0].NAME,
          image: result.data[0].IMAGE,
        },
      };
    }
    return {
      success: false,
    };
  };
  setProfileImage = async (data) => {
    const query = "UPDATE Users SET image = :image where id = :id";
    const params = { image: data.image, id: data.user_id };
    const result = await this.execute(query, params);
    if (result.success === true) {
      return {
        success: true,
        path: data.image,
      };
    }
    return {
      success: false,
    };
  };
}

module.exports = profileRepository;
