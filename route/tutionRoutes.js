const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TutionController = require("../controller/tutionController");
const tutionController = new TutionController();

// anyone can see the list off items
router.use(authMiddleware);
router
  .route("/post")
  .post(tutionController.post)
  .get(tutionController.getPosts);
router.get("/my_list", tutionController.getMyPosts);
router.get("/list", tutionController.getPosts);
router
  .route("/apply")
  .post(tutionController.apply)
  .get(tutionController.getApplications);
router
  .route("/offer")
  .post(tutionController.offer)
  .get(tutionController.getOffers);

module.exports = router;
