const Controller = require("./base");
const CourseRepository = require("../repository/courseRepository");
const courseRepository = new CourseRepository();
class CourseController extends Controller {
  constructor() {
    super();
  }
  create = async (req, res) => {
    let result = await courseRepository.create(req.body);

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

  enroll = async (req, res) => {
    let result = await courseRepository.enroll(req.body);

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
  addBatch = async (req, res) => {
    let result = await courseRepository.addBatch(req.body);

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
  getClassOptions = async (req, res) => {
    // // console.log("Data", req.body);
    const result = await courseRepository.getClassOptions(req.body);
    // console.log("Class: ", result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getSubjectOptions = async (req, res) => {
    const result = await courseRepository.getSubjectOptions(req.body);
    // console.log("Subject: ", result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getBatchOptions = async (req, res) => {
    const result = await courseRepository.getBatchOptions(req.body);
    // console.log("Subject: ", result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getBatches = async (req, res) => {
    const result = await courseRepository.getBatches(req.body);
    // console.log("Subject: ", result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getMyList = async (req, res) => {
    const result = await courseRepository.getMyList(req.body);
    // console.log("COurses: ", result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getMyListAdmin = async (req, res) => {
    const result = await courseRepository.getMyListAdmin(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  addCourse = async (req, res) => {
    let result = await courseRepository.addCourse(req.body);

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

module.exports = CourseController;
