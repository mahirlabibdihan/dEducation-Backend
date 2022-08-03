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
    if (result.success == true) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  getList = async (req, res) => {
    const result = await coachingRepository.getList();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  getMyList = async (req, res) => {
    const result = await coachingRepository.getMyList(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  joinCoaching = async (req, res) => {
    let result = await coachingRepository.joinCoaching(req.body);

    if (result.success == true) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  updateInfo = async (req, res) => {
    console.log(req.body);
    let result = await coachingRepository.updateInfo(req.body.coaching);
    if (result.success == true) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  getInfo = async (req, res) => {
    let result = await coachingRepository.getInfo(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  getRequests = async (req, res) => {
    let result = await coachingRepository.getRequests(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  getCourses = async (req, res) => {
    let result = await coachingRepository.getCourses(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
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
    // fs.readFile(req.files.document.data, "utf8", (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(data);
    // });
    // console.log(JSON.parse());
    if (req.files === null) {
      res.status(404).json({
        success: false,
      });
    }
    // await this.deleteProfilePicture(req, res);
    // console.log(data);
    // console.log(req.files.file);
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
    res.status(404).json({
      success: false,
    });
  };
}

module.exports = CoachingController;
