const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TutorsController = require("../controller/tutorsController");
const tutorsController = new TutorsController();

// anyone can see the list off items
router.use(authMiddleware);
router.route("/list").get(tutorsController.getList);
router.route("/my_list").get(tutorsController.getMyList);
module.exports = router;
