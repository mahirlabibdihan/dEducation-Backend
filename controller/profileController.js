const Controller = require("./base");
const ProfileRepository = require("../repository/profileRepository");
const profileRepository = new ProfileRepository();

class profileController extends Controller {
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

  setProfileImage = async (req, res) => {
    if (req.body.files === null) {
      res.status(404).json({
        success: false,
      });
    }
    const file = data.files.file;
    const filePath = `/public/assets/images/${file.name}`;
    file.mv(filePath, (err) => {
      if (err) {
        res.status(404).json({
          success: false,
        });
      }
    });
    req.body["image"] = filePath;
    let result = await profileRepository.setProfileImage(req.body);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  setProfile = async (req, res) => {
    let result = await profileRepository.update(req.body);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = profileController;
