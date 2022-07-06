const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const StudentsController = require("../controller/studentsController");
const studentsController = new StudentsController();

// anyone can see the list off items
router.use(authMiddleware);
// router.route("/").get(tutorsController.getList);
router.route("/my_list").get(studentsController.getMyList);
module.exports = router;
