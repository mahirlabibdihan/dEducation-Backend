const Controller = require("./base");
const AuthRepository = require("../repository/authRepository");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../service/email");
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
      } else {
        return res.status(404).json({
          success: false,
          error: "Invalid credentials",
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

  resetPass = async (req, res) => {
    const result = await authRepository.getResetEmail(req.body.token);
    if (result.success) {
      const newPassHash = bcrypt.hashSync(req.body.new_pass, 10);
      const result2 = await authRepository.resetPass(result.data, newPassHash);
      return this.handleResponse(result2, res);
    }
    res.status(404).json({
      success: false,
      error: "Invalid token",
    });
  };

  sendResetMail = async (req, res) => {
    const result = await authRepository.getUserIDPass(
      req.body.email,
      req.body.type
    );
    if (result.success) {
      const token = jwt.sign(
        {
          email: req.body.email,
          type: req.body.type,
        },
        process.env.JWT_SECRET,
        { expiresIn: `${tokenExpiryDuration}s` }
      );
      const result2 = await authRepository.saveResetToken(
        req.body.email,
        token
      );
      if (result2.success) {
        sendMail(
          req.body.email,
          "Password reset",
          `Your password reset link is: http://localhost:8080/reset_password?type=${req.body.type}&token=${token}`
        )
          .then((value) => {
            res.status(200).json({
              success: true,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(404).json({
              success: false,
              error: "Something goes wrong. Please try again",
            });
          });
      } else {
        this.handleResponse(result2, res);
      }
    } else {
      res.status(404).json({
        success: false,
        error: "The Email is not registered with us",
      });
    }
  };
}

module.exports = AuthController;
