const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const CourseController = require("../controller/courseController");
const courseController = new CourseController();

//anyone can see the list off items

router.use(authMiddleware);
router.route("/create").post(courseController.create);
router.route("/get_info").post(courseController.getInfo);
router.route("/list").get(courseController.getList);
router.route("/my_list").get(courseController.getMyList);
// router.route("/join").post(courseController.joinCoaching);
// router
//   .route("/add_course")
//   .post(courseController.addCourse)
//   .get(courseController.getCourses);

module.exports = router;
