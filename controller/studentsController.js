const Controller = require("./base");
const StudentsRepository = require("../repository/studentsRepository");
const studentsRepository = new StudentsRepository();
const CoachingRepository = require("../repository/coachingRepository");
const coachingRepository = new CoachingRepository();
class StudentsController extends Controller {
  constructor() {
    super();
  }
  getMyList = async (req, res) => {
    const result = await studentsRepository.getMyList(req.body);
    this.handleResponse(result, res);
  };
  getPendingList = async (req, res) => {
    const result = await studentsRepository.getPendingList(req.body);
    this.handleResponse(result, res);
  };
  getEnrolledList = async (req, res) => {
    const result = await studentsRepository.getEnrolledList(req.body);
    // console.log(result);
    this.handleResponse(result, res);
  };
  getMembersList = async (req, res) => {
    const result = await studentsRepository.getMembersList(req.body);
    this.handleResponse(result, res);
  };
  getJoinRequests = async (req, res) => {
    let result = await studentsRepository.getJoinRequests(req.body);
    this.handleResponse(result, res);
  };
  getPendingEnrollments = async (req, res) => {
    const result = await studentsRepository.getPendingEnrollments(req.body);
    this.handleResponse(result, res);
  };
}

module.exports = StudentsController;
