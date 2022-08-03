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
router.route("/apply/cancel").post(tutionController.cancelApplication);
router.post(
  "/get_applicants_tution_details",
  tutionController.getApplicantsTutionDetails
);
router.route("/offer").post(tutionController.offer);
router.post("/get_offer_student", tutionController.getOfferFromStudent);
router.post("/get_offer_tutor", tutionController.getOfferFromTutor);
router.post("/offer/accept", tutionController.acceptOffer);
router.post("/offer/reject", tutionController.rejectOffer);
router.post("/offer/cancel", tutionController.cancelOffer);
router.post("/get_details", tutionController.getDetails);
router.get("/get_all_details", tutionController.getAllDetails);
router.get("/get_my_details", tutionController.getMyDetails);
router.get("/get_pending_details", tutionController.getPendingDetails);
router.get("/get_apply_list", tutionController.getApplyList);
module.exports = router;
