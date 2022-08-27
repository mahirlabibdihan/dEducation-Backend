const Controller = require("./base");
const TutorsRepository = require("../repository/tutorsRepository");
const tutorsRepository = new TutorsRepository();
class TutorController extends Controller {
  constructor() {
    super();
  }
  getList = async (req, res) => {
    let result = await tutorsRepository.getList(req.body);
    this.handleResponse(result, res);
  };
  getMyMaterials = async (req, res) => {
    let result = await tutorsRepository.getMyMaterials(req.body);
    this.handleResponse(result, res);
  };
  getAllMaterials = async (req, res) => {
    let result = await tutorsRepository.getAllMaterials();
    this.handleResponse(result, res);
  };
  uploadMaterial = async (req, res) => {
    let result = await tutorsRepository.uploadMaterial(req.body);
    this.handleResponse(result, res);
  };
  getFilteredList = async (req, res) => {
    let result = await tutorsRepository.getFilteredList(req.body.filter);
    this.handleResponse(result, res);
  };
  getEducation = async (req, res) => {
    let result = await tutorsRepository.getEducation(req.body);
    this.handleResponse(result, res);
  };
  getEducationsList = async (req, res) => {
    let result = await tutorsRepository.getEducationsList(req.body);
    this.handleResponse(result, res);
  };
  getFilteredEducationsList = async (req, res) => {
    let result = await tutorsRepository.getFilteredEducationsList(
      req.body.filter
    );
    this.handleResponse(result, res);
  };
  getMyList = async (req, res) => {
    const result = await tutorsRepository.getMyList(req.body);
    this.handleResponse(result, res);
  };
  getApplicantsList = async (req, res) => {
    let result = await tutorsRepository.getApplicantsList(req.body);
    this.handleResponse(result, res);
  };
}

module.exports = TutorController;
