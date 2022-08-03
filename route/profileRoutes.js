const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const ProfileController = require("../controller/profileController");
const profileController = new ProfileController();

//anyone can see the list off items
router.use(authMiddleware);
router.post("/upload", profileController.setProfilePicture);
router
  .route("/")
  .get(profileController.getProfile)
  .post(profileController.setProfile);
router
  .route("/education")
  .get(profileController.getEducation)
  .post(profileController.setEducation);
module.exports = router;
