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
    const result = await authRepository.getUserIDPass(
      req.body.email,
      req.body.type
    );
    console.log(result);
    if (result.success) {
      if (bcrypt.compareSync(req.body.pass, result.pass)) {
        //signing a token with necessary information for validation
        console.log(result.id, req.body.email, result.pass, req.body.type);
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
    res.status(404).json({
      success: false,
    });
  };

  changePass = async (req, res) => {
    if (bcrypt.compareSync(data.curr_pass, data.pass)) {
      const newPassHash = bcrypt.hashSync(data.new_pass, 10);
      const result = await authRepository.changePass(
        req.body.user_id,
        newPassHash
      );
      if (result.success) {
        return res.status(200).json({
          success: true,
          token: this.getToken(
            data.user_id,
            data.email,
            newPassHash,
            data.type
          ),
        });
      }
    }
    res.status(404).json({
      success: false,
    });
  };
}

module.exports = AuthController;
