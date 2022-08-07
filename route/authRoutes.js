const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const AuthController = require("../controller/authController");
const authController = new AuthController();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/change_pass", authMiddleware, authController.changePass);
module.exports = router;
