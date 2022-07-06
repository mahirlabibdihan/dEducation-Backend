const router = require("express").Router();
const authMiddleware = require("../service/tokenValidationService");
const TutionController = require("../controller/tutionController");
const tutionController = new TutionController();

// anyone can see the list off items
router.use(authMiddleware);
router.route("/post").post(tutionController.post);
router.get("/list", tutionController.getPosts);
router.get("/my_list", tutionController.getMyPosts);
router.route("/apply").post(tutionController.apply);
router.post("/get_applicants", tutionController.getApplicants);
router
  .route("/offer")
  .post(tutionController.offer)
  .get(tutionController.getMyOffers);
router.post("/get_offer_student", tutionController.getOfferFromStudent);
router.post("/get_offer_tutor", tutionController.getOfferFromTutor);
router.post("/accept", tutionController.acceptOffer);
router.post("/reject", tutionController.rejectOffer);
router.post("/by_post", tutionController.getOfferFromPost);
module.exports = router;
