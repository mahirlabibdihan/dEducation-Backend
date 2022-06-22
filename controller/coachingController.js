const Controller = require("./base");
const CoachingRepository = require("../repository/coachingRepository");
const coachingRepository = new CoachingRepository();
class CoachingController extends Controller {
  constructor() {
    super();
  }
  create = async (req, res) => {
    let result = await coachingRepository.post(req.body);
    console.log(result);
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
  joinRequest = async (req, res) => {
    let result = await coachingRepository.offer(req.body);
    console.log(result);
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
  addMember = async (req, res) => {
    let result = await coachingRepository.apply(req.body);
    console.log(result);
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
  addCourse = async (req, res) => {
    let result = await coachingRepository.apply(req.body);
    console.log(result);
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
  assignCourse = async (req, res) => {
    let result = await coachingRepository.apply(req.body);
    console.log(result);
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
}

module.exports = CoachingController;
