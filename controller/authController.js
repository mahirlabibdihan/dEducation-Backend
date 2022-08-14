const Controller = require("./base");
const AuthRepository = require("../repository/authRepository");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenExpiryDuration = 86400;
class AuthController extends Controller {
  constructor() {
    super();
  }
  getToken = (id, email, pass, type) => {
    const token = jwt.sign(
      {
        id: id,
        email: email,
        pass: pass,
        type: type,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${tokenExpiryDuration}s` }
    );
    return token;
  };
  signup = async (req, res) => {
    req.body["hashPass"] = bcrypt.hashSync(req.body.pass, 10);
    let result = await authRepository.signup(req.body);
    this.handleResponse(result, res);
  };

  login = async (req, res) => {
    const result = await authRepository.getUserIDPass(
      req.body.email,
      req.body.type
    );
    // console.log("=>", result, req.body.type);
    if (result.success) {
      if (bcrypt.compareSync(req.body.pass, result.pass)) {
        return res.status(200).json({
          success: true,
          token: this.getToken(
            result.id,
            req.body.email,
            result.pass,
            req.body.type
          ),
        });
      }
    }
    res.status(404).json(result);
  };

  changePass = async (req, res) => {
    if (bcrypt.compareSync(req.body.curr_pass, req.body.pass)) {
      const newPassHash = bcrypt.hashSync(req.body.new_pass, 10);
      const result = await authRepository.changePass(
        req.body.user_id,
        newPassHash
      );
      if (result.success) {
        return res.status(200).json({
          success: true,
          token: this.getToken(
            req.body.user_id,
            req.body.email,
            newPassHash,
            req.body.type
          ),
        });
      }
      res.status(404).json(result);
    }
    res.status(404).json({
      success: false,
      error: "Incorrect password",
    });
  };
}

module.exports = AuthController;
