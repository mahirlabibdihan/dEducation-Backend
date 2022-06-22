const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const CoachingController = require("../controller/coachingController");
const coachingController = new CoachingController();

//anyone can see the list off items
router.post("/create", authMiddleware, coachingController.create());
router.post("/join_request", authMiddleware, coachingController.joinRequest());
router.post("/add_member", authMiddleware, coachingController.addMember());
router.post("/add_course", authMiddleware, coachingController.addCourse());
router.post(
  "/assign_course",
  authMiddleware,
  coachingController.assignCourse()
);

router.get("/coaching_info", authMiddleware, coachingController.assignCourse());
router.get("/member_list", authMiddleware, coachingController.assignCourse());
router.get("/course_list", authMiddleware, coachingController.assignCourse());
router.get(
  "/course_assignment",
  authMiddleware,
  coachingController.assignCourse()
);
module.exports = router;
