const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProfileController = require("../controller/profileController");
const profileController = new ProfileController();

router.use(authMiddleware);
router.post("/upload", profileController.setProfilePicture);
router.get("/", profileController.getProfile);
router.post("/", profileController.setProfile);
router.get("/education", profileController.getEducation);
router.post("/education", profileController.setEducation);
module.exports = router;
