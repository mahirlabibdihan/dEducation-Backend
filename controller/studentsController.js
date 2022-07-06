const Controller = require("./base");
const StudentsRepository = require("../repository/studentsRepository");
const studentsRepository = new StudentsRepository();
class StudentsController extends Controller {
  constructor() {
    super();
  }
  getMyList = async (req, res) => {
    const result = await studentsRepository.getMyList(req.body);
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = StudentsController;
