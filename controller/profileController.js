const Controller = require("./base");
const ProfileRepository = require("../repository/profileRepository");
const profileRepository = new ProfileRepository();
const fs = require("fs");
class ProfileController extends Controller {
  constructor() {
    super();
  }
  getProfile = async (req, res) => {
    const result = await (req.body.type == "STUDENT"
      ? profileRepository.getStudentProfile(req.body.user_id)
      : profileRepository.getTutorProfile(req.body.user_id));
    // console.log(req.body, result.data);
    this.handleResponse(result, res);
  };
  getEducation = async (req, res) => {
    const result = await profileRepository.getEducation(req.body);
    this.handleResponse(result, res);
  };
  getNotifications = async (req, res) => {
    const result = await profileRepository.getNotifications(req.body);
    this.handleResponse(result, res);
  };
  setEducation = async (req, res) => {
    const result = await profileRepository.getEducation(req.body);

    for (let i = 0; i < result.data.length; i++) {
      let flag = 0;
      for (let j = 0; j < req.body.list.length; j++) {
        if (req.body.list[j].eq_id == result.data[i].EQ_ID) {
          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        const result2 = await profileRepository.deleteEducation(
          result.data[i].EQ_ID
        );
        if (!result2.success) {
          res.status(404).json(result2);
        }
      } else {
        const result2 = await profileRepository.updateEducation({
          eq_id: req.body.list[i].eq_id,
          user_id: req.body.user_id,
          eq_id: req.body.list[i].eq_id,
          institute: req.body.list[i].institute,
          field_of_study: req.body.list[i].field_of_study,
          degree: req.body.list[i].degree,
          passing_year: req.body.list[i].passing_year,
        });
        if (!result2.success) {
          res.status(404).json(result2);
        }
      }
    }
    for (let i = 0; i < req.body.list.length; i++) {
      if (req.body.list[i].eq_id == null) {
        // console.log("ADD NEW");
        const result2 = await profileRepository.addEducation({
          user_id: req.body.user_id,
          eq_id: req.body.list[i].eq_id,
          institute: req.body.list[i].institute,
          field_of_study: req.body.list[i].field_of_study,
          degree: req.body.list[i].degree,
          passing_year: req.body.list[i].passing_year,
        });
        if (!result2.success) {
          res.status(404).json(result2);
        }
      }
    }
    res.status(200).json(result.data);
  };
  setProfile = async (req, res) => {
    const result = await (req.body.type == "STUDENT"
      ? profileRepository.setStudentProfile(req.body)
      : profileRepository.setTutorProfile(req.body));
    this.handleResponse(result, res);
  };
  deleteProfilePicture = async (req, res) => {
    // console.log("START DELETING");
    const result = await profileRepository.getProfile(req.body);
    // console.log(result);
    if (result.data.IMAGE !== null) {
      // console.log("AGAIN START DELETING");
      try {
        fs.unlinkSync(
          `G:/github/hidden-brain/hidden-brain-backend/public/assets/images/${result.data.IMAGE}`
        );
      } catch (err) {
        // console.log(err);
      }
    }
  };
  setProfilePicture = async (req, res) => {
    if (req.files === null) {
      res.status(404).json(result);
    }
    const profile = await profileRepository.getProfile(req.body);
    const prev_image = profile.data.IMAGE;
    if (prev_image[0] >= "0" && prev_image[0] <= "9") {
      await this.deleteProfilePicture(req, res);
    } else {
      // it isn't
    }
    // await this.deleteProfilePicture(req, res);
    const file = req.files.file;
    req.body["ext"] = file.name.split(".").pop();
    const result = await profileRepository.setProfilePicture(req.body);

    if (result.success) {
      try {
        await file.mv(
          `G:/github/hidden-brain/hidden-brain-backend/public/assets/images/${result.image}`
        );
      } catch (err) {
        (err) => {
          if (!err) {
            // console.log(result.image);
          }
        };
      }
      return res.status(200).json({
        success: true,
        image: result.image,
      });
    }
    res.status(404).json(result);
  };
}

module.exports = ProfileController;
