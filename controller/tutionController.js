const Controller = require("./base");
const TutionRepository = require("../repository/tutionRepository");
const tutionRepository = new TutionRepository();
class TutionController extends Controller {
  constructor() {
    super();
  }
  post = async (req, res) => {
    let result = await tutionRepository.post(req.body);
    this.handleResponse(result, res);
  };
  offer = async (req, res) => {
    let result = await tutionRepository.offer(req.body);
    this.handleResponse(result, res);
  };
  apply = async (req, res) => {
    let result = await tutionRepository.apply(req.body);
    this.handleResponse(result, res);
  };
  cancelApplication = async (req, res) => {
    let result = await tutionRepository.cancelApplication(req.body);
    this.handleResponse(result, res);
  };
  getMyPosts = async (req, res) => {
    let result = await tutionRepository.getMyPosts(req.body);
    this.handleResponse(result, res);
  };
  getPosts = async (req, res) => {
    let result = await tutionRepository.getPosts(req.body);
    this.handleResponse(result, res);
  };
  getFilteredPosts = async (req, res) => {
    let result = await tutionRepository.getFilteredPosts(req.body);
    this.handleResponse(result, res);
  };
  getApplicantsTutionDetails = async (req, res) => {
    let result = await tutionRepository.getApplicantsTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  getApplyList = async (req, res) => {
    let result = await tutionRepository.getApplyList(req.body);
    this.handleResponse(result, res);
  };
  getFilteredApplyList = async (req, res) => {
    let result = await tutionRepository.getFilteredApplyList(req.body);
    this.handleResponse(result, res);
  };
  getPendingDetails = async (req, res) => {
    let result = await tutionRepository.getPendingDetails(req.body);
    this.handleResponse(result, res);
  };
  getOfferFromStudent = async (req, res) => {
    let result = await tutionRepository.getTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  getOfferFromTutor = async (req, res) => {
    let result = await tutionRepository.getTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  acceptOffer = async (req, res) => {
    let result = await tutionRepository.acceptOffer(req.body);
    this.handleResponse(result, res);
  };
  rejectOffer = async (req, res) => {
    let result = await tutionRepository.rejectOffer(req.body);
    this.handleResponse(result, res);
  };
  cancelOffer = async (req, res) => {
    let result = await tutionRepository.cancelOffer(req.body);
    this.handleResponse(result, res);
  };
  getDetails = async (req, res) => {
    let result = await tutionRepository.getTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  getAllDetails = async (req, res) => {
    let result = await tutionRepository.getAllDetails(req.body);
    this.handleResponse(result, res);
  };
  getFilteredDetails = async (req, res) => {
    let result = await tutionRepository.getFilteredDetails(req.body);
    this.handleResponse(result, res);
  };
  getMyDetails = async (req, res) => {
    let result = await tutionRepository.getMyDetails(req.body);
    this.handleResponse(result, res);
  };
  rate = async (req, res) => {
    console.log("RATE FIRED");
    let result = await tutionRepository.rate(req.body);
    this.handleResponse(result, res);
  };
  getFeedbacks = async (req, res) => {
    let result = await tutionRepository.getFeedbacks(req.body);
    this.handleResponse(result, res);
  };
}

module.exports = TutionController;
