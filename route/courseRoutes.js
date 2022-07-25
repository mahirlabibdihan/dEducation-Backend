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
router.route("/my_list_admin").get(courseController.getMyListAdmin);
router.route("/class_options").post(courseController.getClassOptions);
router.route("/subject_options").post(courseController.getSubjectOptions);
router.route("/batch_options").post(courseController.getBatchOptions);
router.route("/batches").post(courseController.getBatches);
router.route("/students").post(courseController.getStudents);
router.route("/add_batch").post(courseController.addBatch);
router.route("/get_id").post(courseController.getCourseId);
router.route("/enroll").post(courseController.enroll);
// router.route("/join").post(courseController.joinCoaching);
// router
//   .route("/add_course")
//   .post(courseController.addCourse)
//   .get(courseController.getCourses);

module.exports = router;
