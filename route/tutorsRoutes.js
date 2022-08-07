const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TutorsController = require("../controller/tutorsController");
const tutorsController = new TutorsController();

router.use(authMiddleware);
router.route("/list").get(tutorsController.getList);
router.route("/filtered_list").post(tutorsController.getFilteredList);
router.route("/education_list").get(tutorsController.getEducationsList);
router.route("/education").post(tutorsController.getEducation);
router.post(
  "/filtered_education_list",
  tutorsController.getFilteredEducationsList
);
router.route("/my_list").get(tutorsController.getMyList);
router.post("/applicants_list", tutorsController.getApplicantsList);
module.exports = router;
