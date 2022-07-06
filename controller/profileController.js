const Controller = require("./base");
const ProfileRepository = require("../repository/profileRepository");
const profileRepository = new ProfileRepository();
const fs = require("fs");
class ProfileController extends Controller {
  constructor() {
    super();
  }

  getProfile = async (req, res) => {
    let result = await profileRepository.getProfile(req.body);

    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getProfileByID = async (req, res) => {
    let result = await profileRepository.getProfileByID(req.body);

    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  setProfile = async (req, res) => {
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
    let result = await profileRepository.getProfilePicture(req.body);

    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  deleteProfilePicture = async (req, res) => {
    const result = await profileRepository.getProfilePicture(req.body);
    if (result.image !== null) {
      try {
        fs.unlinkSync(
          `G:/github/hidden-brain-backend/public/assets/images/${result.image}`
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  setProfilePicture = async (req, res) => {
    if (req.files === null) {
      res.status(404).json({
        success: false,
      });
    }
    await this.deleteProfilePicture(req, res);
    const file = req.files.file;
    req.body["ext"] = file.name.split(".").pop();
    const result = await profileRepository.setProfilePicture(req.body);

    if (result.success) {
      try {
        await file.mv(
          `G:/github/hidden-brain-backend/public/assets/images/${result.image}`
        );
      } catch (err) {
        (err) => {
          if (!err) {
            console.log(result.image);
          }
        };
      }
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
