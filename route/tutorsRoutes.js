const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TutorsController = require("../controller/tutorsController");
const tutorsController = new TutorsController();

// anyone can see the list off items
router.use(authMiddleware);
router.route("/").get(tutorsController.getList);

module.exports = router;
