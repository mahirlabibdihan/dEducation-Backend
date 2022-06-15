const Controller = require("./base");
const AuthRepository = require("../repository/authRepository");
const authRepository = new AuthRepository();
class AuthController extends Controller {
  constructor() {
    super();
  }
  signup = async (req, res) => {
    console.log("Register request");
    let result = await authRepository.signup(req.body);
    if (result.success) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  login = async (req, res) => {
    console.log("Login request");
    let result = await authRepository.login(req.body);
    console.log(result);
    if (result.success == true) {
      res.status(200).json({
        success: true,
        token: result.token,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };

  changePass = async (req, res) => {
    let result = await authRepository.changePass(req.body);
    if (result.success == true) {
      res.status(200).json({
        success: true,
        token: result.token,
      });
    } else {
      res.status(404).json({
        success: false,
      });
    }
  };
}

module.exports = AuthController;
