const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProfileController = require("../controller/profileController");
const profileController = new ProfileController();

//anyone can see the list off items
router.post("/upload", authMiddleware, profileController.setProfileImage);
router.get("/", authMiddleware, profileController.getProfile);

module.exports = router;
