const Controller = require("./base");
const TutorsRepository = require("../repository/tutorsRepository");
const tutorsRepository = new TutorsRepository();
class TutorController extends Controller {
  constructor() {
    super();
  }
  getList = async (req, res) => {
    // console.log("Register request");
    let result = await tutorsRepository.getList();
    if (result.success) {
      res.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = TutorController;
