const Controller = require("./base");
const CoachingRepository = require("../repository/coachingRepository");
const coachingRepository = new CoachingRepository();
class CoachingController extends Controller {
  constructor() {
    super();
  }
  create = async (req, res) => {
    let result = await coachingRepository.create(req.body);
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
  getList = async (req, res) => {
    const result = await coachingRepository.getList();
    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getMyList = async (req, res) => {
    const result = await coachingRepository.getList(req.body);
    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  joinRequest = async (req, res) => {
    const result = await coachingRepository.joinRequest(req.body);
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
    let result = await coachingRepository.addMember(req.body);
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
    let result = await coachingRepository.addCourse(req.body);
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
    let result = await coachingRepository.assignCourse(req.body);
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
  getInfo = async (req, res) => {
    let result = await coachingRepository.getInfo(req.body);
    console.log(result);
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
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getMembers = async (req, res) => {
    let result = await coachingRepository.getMembers(req.body);
    console.log(result);
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
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getAssignments = async (req, res) => {
    let result = await coachingRepository.getAssignments(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = CoachingController;
