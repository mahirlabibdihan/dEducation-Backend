const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const CoachingController = require("../controller/coachingController");
const coachingController = new CoachingController();

router.use(authMiddleware);
router.route("/update_info").post(coachingController.updateInfo);
router.post("/upload", coachingController.setProfilePicture);
router.route("/create").post(coachingController.create);
router.route("/get_info").post(coachingController.getInfo);
router.route("/list").get(coachingController.getList);
router.route("/join_list").get(coachingController.getJoinList);
router.route("/my_list").get(coachingController.getMyList);
router.route("/join").post(coachingController.joinCoaching);
module.exports = router;
