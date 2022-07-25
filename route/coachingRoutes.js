const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const CoachingController = require("../controller/coachingController");
const coachingController = new CoachingController();

//anyone can see the list off items

router.use(authMiddleware);
router.route("/update_info").post(coachingController.updateInfo);
router.post("/upload", coachingController.setProfilePicture);
router.route("/create").post(coachingController.create);
router.route("/get_info").post(coachingController.getInfo);
router.route("/list").get(coachingController.getList);
router.route("/my_list").get(coachingController.getMyList);
router.route("/join").post(coachingController.joinCoaching);
router.route("/students").post(coachingController.getStudents);
// router
//   .route("/join_request")
//   .post(coachingController.joinRequest)
//   .get(coachingController.getRequests);

// router
//   .route("/add_member")
//   .post(coachingController.addMember)
//   .get(coachingController.getMembers);

// router
//   .route("/add_course")
//   .post(coachingController.addCourse)
//   .get(coachingController.getCourses);

// router
//   .route("/assign_course")
//   .post(coachingController.assignCourse)
//   .get(coachingController.getAssignments);
module.exports = router;
