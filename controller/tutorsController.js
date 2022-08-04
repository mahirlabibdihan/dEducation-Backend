const Controller = require("./base");
const TutorsRepository = require("../repository/tutorsRepository");
const tutorsRepository = new TutorsRepository();
class TutorController extends Controller {
  constructor() {
    super();
  }
  getList = async (req, res) => {
    let result = await tutorsRepository.getList(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getFilteredList = async (req, res) => {
    console.log("FILTERED LIST");
    let result = await tutorsRepository.getFilteredList(req.body.filter);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getEducation = async (req, res) => {
    console.log("EDUCATION LIST");
    let result = await tutorsRepository.getEducation(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getEducationsList = async (req, res) => {
    console.log("EDUCATION LIST");
    let result = await tutorsRepository.getEducationsList(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getFilteredEducationsList = async (req, res) => {
    console.log("FILTERED LIST");
    let result = await tutorsRepository.getFilteredEducationsList(
      req.body.filter
    );
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getMyList = async (req, res) => {
    const result = await tutorsRepository.getMyList(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getApplicantsList = async (req, res) => {
    let result = await tutorsRepository.getApplicantsList(req.body);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = TutorController;
