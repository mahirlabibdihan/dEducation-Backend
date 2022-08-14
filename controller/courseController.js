const Controller = require("./base");
const CourseRepository = require("../repository/courseRepository");
const courseRepository = new CourseRepository();
class CourseController extends Controller {
  constructor() {
    super();
  }
  create = async (req, res) => {
    let result = await courseRepository.create(req.body);
    this.handleResponse(result, res);
  };

  enroll = async (req, res) => {
    let result = await courseRepository.enroll(req.body);
    this.handleResponse(result, res);
  };
  approveEnrollment = async (req, res) => {
    let result = await courseRepository.approveEnrollment(req.body);
    this.handleResponse(result, res);
  };
  declineEnrollment = async (req, res) => {
    let result = await courseRepository.declineEnrollment(req.body);
    this.handleResponse(result, res);
  };
  cancelEnrollment = async (req, res) => {
    let result = await courseRepository.cancelEnrollment(req.body);
    this.handleResponse(result, res);
  };
  addBatch = async (req, res) => {
    let result = await courseRepository.addBatch(req.body);
    this.handleResponse(result, res);
  };
  getClassOptions = async (req, res) => {
    const result = await courseRepository.getClassOptions(req.body);
    this.handleResponse(result, res);
  };
  getSubjectOptions = async (req, res) => {
    const result = await courseRepository.getSubjectOptions(req.body);
    this.handleResponse(result, res);
  };
  getBatchOptions = async (req, res) => {
    const result = await courseRepository.getBatchOptions(req.body);
    this.handleResponse(result, res);
  };
  getBatches = async (req, res) => {
    const result = await courseRepository.getBatches(req.body);
    this.handleResponse(result, res);
  };
  getMyList = async (req, res) => {
    const result = await courseRepository.getMyList(req.body);
    this.handleResponse(result, res);
  };
  getMyListAdmin = async (req, res) => {
    const result = await courseRepository.getMyListAdmin(req.body);
    this.handleResponse(result, res);
  };
  addCourse = async (req, res) => {
    let result = await courseRepository.addCourse(req.body);
    this.handleResponse(result, res);
  };
}

module.exports = CourseController;
