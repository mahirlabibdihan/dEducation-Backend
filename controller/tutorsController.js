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
}

module.exports = TutorController;
