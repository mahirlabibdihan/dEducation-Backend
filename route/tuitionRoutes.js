const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TuitionController = require("../controller/tuitionController");
const tuitionController = new TuitionController();

// anyone can see the list off items
router.use(authMiddleware);
router
  .route("/post")
  .post(tuitionController.post)
  .get(tuitionController.getPosts);
router
  .route("/apply")
  .post(tuitionController.apply)
  .get(tuitionController.getApplications);
router
  .route("/offer")
  .post(tuitionController.offer)
  .get(tuitionController.getOffers);

module.exports = router;
