const Controller = require("./base");
const StudentsRepository = require("../repository/studentsRepository");
const studentsRepository = new StudentsRepository();
class StudentsController extends Controller {
  constructor() {
    super();
  }
  getMyList = async (req, res) => {
    const result = await studentsRepository.getMyList(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getPendingList = async (req, res) => {
    let result = await studentsRepository.getPendingList(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getEnrolledList = async (req, res) => {
    let result = await studentsRepository.getEnrolledList(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getMembersList = async (req, res) => {
    let result = await studentsRepository.getMembersList(req.body);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = StudentsController;
