const Controller = require("./base");
const TutionRepository = require("../repository/tutionRepository");
const tutionRepository = new TutionRepository();
class TutionController extends Controller {
  constructor() {
    super();
  }
  post = async (req, res) => {
    console.log("POST TUTION");
    let result = await tutionRepository.post(req.body);
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
  offer = async (req, res) => {
    let result = await tutionRepository.offer(req.body);
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
  apply = async (req, res) => {
    let result = await tutionRepository.apply(req.body);
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
  getMyPosts = async (req, res) => {
    console.log("GET MY POSTS");
    let result = await tutionRepository.getMyPosts(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getPosts = async (req, res) => {
    let result = await tutionRepository.getPosts(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getApplicants = async (req, res) => {
    let result = await tutionRepository.getApplicants(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getOffers = async (req, res) => {
    let result = await tutionRepository.getOffers(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getOffer = async (req, res) => {
    console.log("*******************");
    let result = await tutionRepository.getOffer(req.body);
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

module.exports = TutionController;
