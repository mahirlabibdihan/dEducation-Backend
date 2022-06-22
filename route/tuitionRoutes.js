const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TuitionController = require("../controller/tuitionController");
const tuitionController = new TuitionController();

//anyone can see the list off items
router.post("/post", authMiddleware, tuitionController.post());
router.post("/apply", authMiddleware, tuitionController.apply());
router.post("/offer", authMiddleware, tuitionController.offer());
router.get("/tuition_post_list", authMiddleware, tuitionController.post());
router.get("/application_list", authMiddleware, tuitionController.post());
router.get("/offer_list", authMiddleware, tuitionController.post());
module.exports = router;
