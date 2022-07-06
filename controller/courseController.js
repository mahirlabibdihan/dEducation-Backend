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
  getList = async (req, res) => {
    const result = await courseRepository.getList();
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
    console.log("COurses: ", result);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  addMember = async (req, res) => {
    let result = await courseRepository.addMember(req.body);

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
  joinCoaching = async (req, res) => {
    let result = await courseRepository.joinCoaching(req.body);

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

  getInfo = async (req, res) => {
    let result = await courseRepository.getInfo(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  getMembers = async (req, res) => {
    let result = await courseRepository.getMembers(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = CourseController;
