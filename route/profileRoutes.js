const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProfileController = require("../controller/profileController");
const profileController = new ProfileController();

//anyone can see the list off items
router.use(authMiddleware);
router.post("/upload", profileController.setProfilePicture);
router.get("/", profileController.getProfile);
router.post("/", profileController.setProfile);
router.get("/picture", profileController.getProfilePicture);
module.exports = router;
