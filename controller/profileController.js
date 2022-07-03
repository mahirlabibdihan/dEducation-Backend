const Controller = require("./base");
const ProfileRepository = require("../repository/profileRepository");
const profileRepository = new ProfileRepository();
const fs = require("fs");
class ProfileController extends Controller {
  constructor() {
    super();
  }
  
  getProfile = async (req, res) => {
    console.log("Profile request");
    let result = await profileRepository.getProfile(req.body);
    console.log(result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  setProfile = async (req, res) => {
    console.log("UPDATE REUQEST");
    console.log("SET PROFILE:", req.body);
    let result = await profileRepository.setProfile(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getProfilePicture = async (req, res) => {
    console.log("Profile Picture request");
    let result = await profileRepository.getProfilePicture(req.body);
    console.log(result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  deleteProfilePicture = async (req, res) => {
    console.log("Delete start");
    const result = await profileRepository.getProfilePicture(req.body);
    console.log(result);
    if (result.image !== null) {
      console.log("Delete start 2");
      try {
        fs.unlinkSync(
          `G:/github/hidden-brain-backend/public/assets/images/${result.image}`
        );
        console.log("Deleting");
      } catch (err) {
        console.log(err);
      }
      console.log("Delete end");
    }
  };
  setProfilePicture = async (req, res) => {
    // console.log(req);
    console.log(req.files);
    if (req.files === null) {
      res.status(404).json({
        success: false,
      });
    }
    await this.deleteProfilePicture(req, res);
    const file = req.files.file;
    req.body["ext"] = file.name.split(".").pop();
    const result = await profileRepository.setProfilePicture(req.body);
    console.log(result);

    if (result.success) {
      try {
        await file.mv(
          `G:/github/hidden-brain-backend/public/assets/images/${result.image}`
        );
        console.log("Moving");
      } catch (err) {
        (err) => {
          if (!err) {
            console.log(result.image);
          }
        };
      }
      console.log("Send response");
      return res.status(200).json({
        success: true,
        image: result.image,
      });
    }
    res.status(404).json({
      success: false,
    });
  };
}

module.exports = ProfileController;
