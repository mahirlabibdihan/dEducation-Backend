const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const StudentsController = require("../controller/studentsController");
const studentsController = new StudentsController();

// anyone can see the list off items
router.use(authMiddleware);
router.route("/my_list").get(studentsController.getMyList);
router.route("/pending_list").get(studentsController.getPendingList);
router.route("/enrolled_list").post(studentsController.getEnrolledList);
router.route("/members_list").post(studentsController.getMembersList);
module.exports = router;
