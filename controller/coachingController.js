const Controller = require("./base");
const fs = require("fs");
// require("file")
const CoachingRepository = require("../repository/coachingRepository");
const coachingRepository = new CoachingRepository();
class CoachingController extends Controller {
  constructor() {
    super();
  }
  create = async (req, res) => {
    let result = await coachingRepository.create(req.body);
    this.handleResponse(result, res);
  };

  getList = async (req, res) => {
    const result = await coachingRepository.getList();
    this.handleResponse(result, res);
  };

  getJoinList = async (req, res) => {
    const result = await coachingRepository.getJoinList(req.body);
    this.handleResponse(result, res);
  };

  getMyList = async (req, res) => {
    const result = await coachingRepository.getMyList(req.body);
    this.handleResponse(result, res);
  };
  getMyNotices = async (req, res) => {
    const result = await coachingRepository.getMyNotices(req.body);
    this.handleResponse(result, res);
  };
  postNotice = async (req, res) => {
    const result = await coachingRepository.postNotice(req.body);
    this.handleResponse(result, res);
  };
  getCourseList = async (req, res) => {
    const result = await coachingRepository.getCourseList(req.body);
    this.handleResponse(result, res);
  };
  joinCoaching = async (req, res) => {
    let result = await coachingRepository.joinCoaching(req.body);
    this.handleResponse(result, res);
  };

  updateInfo = async (req, res) => {
    let result = await coachingRepository.updateInfo(req.body.coaching);
    this.handleResponse(result, res);
  };

  getInfo = async (req, res) => {
    let result = await coachingRepository.getInfo(req.body);
    this.handleResponse(result, res);
  };

  getRequests = async (req, res) => {
    let result = await coachingRepository.getRequests(req.body);

    this.handleResponse(result, res);
  };

  getCourses = async (req, res) => {
    let result = await coachingRepository.getCourses(req.body);

    this.handleResponse(result, res);
  };

  deleteProfilePicture = async (req, res) => {
    const result = await coachingRepository.getInfo(req.body);
    if (result.data.IMAGE !== null) {
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
    // await this.deleteProfilePicture(req, res);
    // console.log(data);
    // console.log(req.files.file);
    // const prev_image = profile.data.IMAGE;
    // if (prev_image[0] >= "0" && prev_image[0] <= "9") {
    //   await this.deleteProfilePicture(req, res);
    // } else {
    //   // it isn't
    // }
    const file = req.files.file;
    req.body["ext"] = file.name.split(".").pop();
    req.body["coaching_id"] = JSON.parse(
      req.files.document.data.toString()
    ).coaching_id;
    const result = await coachingRepository.setProfilePicture(req.body);

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

module.exports = CoachingController;
