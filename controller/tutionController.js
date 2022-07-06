const Controller = require("./base");
const TutionRepository = require("../repository/tutionRepository");
const tutionRepository = new TutionRepository();
class TutionController extends Controller {
  constructor() {
    super();
  }
  post = async (req, res) => {
    let result = await tutionRepository.post(req.body);

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
    let result = await tutionRepository.getMyPosts(req.body);

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

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getMyOffers = async (req, res) => {
    let result = await tutionRepository.getMyOffers(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getOfferFromStudent = async (req, res) => {
    let result = await tutionRepository.getOfferFromStudent(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getOfferFromTutor = async (req, res) => {
    let result = await tutionRepository.getOfferFromTutor(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getOfferFromPost = async (req, res) => {
    let result = await tutionRepository.getOfferFromPost(req.body);

    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  acceptOffer = async (req, res) => {
    let result = await tutionRepository.acceptOffer(req.body);

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
  rejectOffer = async (req, res) => {
    let result = await tutionRepository.rejectOffer(req.body);

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

module.exports = TutionController;
