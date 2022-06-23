const Controller = require("./base");
const TuitionRepository = require("../repository/tuitionRepository");
const tuitionRepository = new TuitionRepository();
class TuitionController extends Controller {
  constructor() {
    super();
  }
  post = async (req, res) => {
    let result = await tuitionRepository.post(req.body);
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
    let result = await tuitionRepository.offer(req.body);
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
    let result = await tuitionRepository.apply(req.body);
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
  getPosts = async (req, res) => {
    let result = await tuitionRepository.getPosts(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
  getApplications = async (req, res) => {
    let result = await tuitionRepository.getApplications(req.body);
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
    let result = await tuitionRepository.getOffers(req.body);
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

module.exports = TuitionController;
