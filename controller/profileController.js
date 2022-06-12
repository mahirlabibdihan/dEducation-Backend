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
    // console.log(req);
    console.log(req.files);
    if (req.files === null) {
      res.status(404).json({
        success: false,
      });
    }
    const file = req.files.file;
    const filePath = `${file.name}`;
    file.mv(
      `G:/Github/hidden-brain-backend/public/assets/images/${file.name}`,
      (err) => {
        // console.log(`../${__dirname}/public/assets/images/${file.name}`);
        if (err) {
          // res.status(404).json({
          //   success: false,
          // });
        }
        console.log("File uploaded!");
      }
    );
    console.log("DONE");
    req.body["image"] = filePath;
    let result = await profileRepository.setProfileImage(req.body);
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        success: true,
        path: result.path,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  setProfile = async (req, res) => {
    let result = await profileRepository.update(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = profileController;
