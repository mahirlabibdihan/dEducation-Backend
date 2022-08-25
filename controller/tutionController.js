const Controller = require("./base");
const TutionRepository = require("../repository/tutionRepository");
const tutionRepository = new TutionRepository();
const ProfileRepository = require("../repository/profileRepository");
const profileRepository = new ProfileRepository();

class TutionController extends Controller {
  constructor() {
    super();
  }
  post = async (req, res) => {
    let result = await tutionRepository.post(req.body);
    this.handleResponse(result, res);
  };
  checkSlot = async (req, res) => {
    const result2 = await profileRepository.getAllSchedule(req.body);
    if (result2.success) {
      const scheduleList = result2.data;
      for (let i = 0; i < scheduleList.length; i++) {
        console.log(scheduleList[i]);
        const days1 = scheduleList[i].CLASS_DAYS.split(", ");
        const days2 = req.body.tution.class_days.split(", ");
        console.log(days1, days2);
        for (let j = 0; j < days1.length; j++) {
          for (let k = 0; k < days2.length; k++) {
            if (days1[j] === days2[k]) {
              const start1 = new Date(
                scheduleList[i].START_TIME.toString().slice(0, -1)
              );
              const start2 = new Date(
                "1970-01-01 " + req.body.tution.start_time + "Z"
              );
              const end1 = new Date(
                scheduleList[i].END_TIME.toString().slice(0, -1)
              );
              const end2 = new Date(
                "1970-01-01 " + req.body.tution.end_time + "Z"
              );
              const l1 = start1.getHours() * 60 + start1.getMinutes();
              const l2 = start2.getHours() * 60 + start2.getMinutes();
              const r1 = end1.getHours() * 60 + end1.getMinutes();
              const r2 = end2.getHours() * 60 + end2.getMinutes();
              if (l1 < r2 && r1 > l2) {
                return { success: false, error: "Timeslot is not free" };
              }
            }
          }
        }
      }
      return { success: true };
    }
  };
  offer = async (req, res) => {
    const result2 = await this.checkSlot(req, res);
    if (result2.success) {
      let result = await tutionRepository.offer(req.body);
      this.handleResponse(result, res);
    } else {
      this.handleResponse(result2, res);
    }
  };
  postOffer = async (req, res) => {
    const result2 = await this.checkSlot(req, res);
    if (result2.success) {
      let result = await tutionRepository.postOffer(req.body);
      this.handleResponse(result, res);
    } else {
      this.handleResponse(result2, res);
    }
  };
  apply = async (req, res) => {
    let result = await tutionRepository.apply(req.body);
    this.handleResponse(result, res);
  };
  cancelApplication = async (req, res) => {
    let result = await tutionRepository.cancelApplication(req.body);
    this.handleResponse(result, res);
  };
  getMyPosts = async (req, res) => {
    let result = await tutionRepository.getMyPosts(req.body);
    this.handleResponse(result, res);
  };
  getSelectedTutor = async (req, res) => {
    let result = await tutionRepository.getSelectedTutor(req.body);
    this.handleResponse(result, res);
  };
  getPosts = async (req, res) => {
    let result = await tutionRepository.getPosts(req.body);
    this.handleResponse(result, res);
  };
  getFilteredPosts = async (req, res) => {
    let result = await tutionRepository.getFilteredPosts(req.body);
    this.handleResponse(result, res);
  };
  getApplicantsTutionDetails = async (req, res) => {
    let result = await tutionRepository.getApplicantsTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  getApplyList = async (req, res) => {
    let result = await tutionRepository.getApplyList(req.body);
    this.handleResponse(result, res);
  };
  getFilteredApplyList = async (req, res) => {
    let result = await tutionRepository.getFilteredApplyList(req.body);
    this.handleResponse(result, res);
  };
  getPendingDetails = async (req, res) => {
    let result = await tutionRepository.getPendingDetails(req.body);
    this.handleResponse(result, res);
  };
  getOfferFromStudent = async (req, res) => {
    let result = await tutionRepository.getTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  getOfferFromTutor = async (req, res) => {
    let result = await tutionRepository.getTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  acceptOffer = async (req, res) => {
    const result2 = await profileRepository.getAllSchedule(req.body);
    req.body["id"] = req.body.student_id;
    const result3 = await tutionRepository.getTutionDetails(req.body);
    if (result2.success && result3.success) {
      const scheduleList = result2.data;
      const tution = result3.data;
      for (let i = 0; i < scheduleList.length; i++) {
        console.log(scheduleList[i], tution);
        const days1 = scheduleList[i].CLASS_DAYS.split(", ");
        const days2 = tution.CLASS_DAYS.split(", ");
        console.log(days1, days2);
        for (let j = 0; j < days1.length; j++) {
          for (let k = 0; k < days2.length; k++) {
            if (days1[j] === days2[k]) {
              const start1 = new Date(
                scheduleList[i].START_TIME.toString().slice(0, -1)
              );
              const start2 = new Date(
                tution.START_TIME.toString().slice(0, -1)
              );
              const end1 = new Date(
                scheduleList[i].END_TIME.toString().slice(0, -1)
              );
              const end2 = new Date(tution.END_TIME.toString().slice(0, -1));
              const l1 = start1.getHours() * 60 + start1.getMinutes();
              const l2 = start2.getHours() * 60 + start2.getMinutes();
              const r1 = end1.getHours() * 60 + end1.getMinutes();
              const r2 = end2.getHours() * 60 + end2.getMinutes();
              if (l1 < r2 && r1 > l2) {
                return this.handleResponse(
                  { success: false, error: "Timeslot is not free" },
                  res
                );
              }
            }
          }
        }
      }
      let result = await tutionRepository.acceptOffer(req.body);
      this.handleResponse(result, res);
    }
  };
  rejectOffer = async (req, res) => {
    let result = await tutionRepository.rejectOffer(req.body);
    this.handleResponse(result, res);
  };
  cancelOffer = async (req, res) => {
    let result = await tutionRepository.cancelOffer(req.body);
    this.handleResponse(result, res);
  };
  getDetails = async (req, res) => {
    let result = await tutionRepository.getTutionDetails(req.body);
    this.handleResponse(result, res);
  };
  getAllDetails = async (req, res) => {
    let result = await tutionRepository.getAllDetails(req.body);
    this.handleResponse(result, res);
  };
  getFilteredDetails = async (req, res) => {
    let result = await tutionRepository.getFilteredDetails(req.body);
    this.handleResponse(result, res);
  };
  getMyDetails = async (req, res) => {
    let result = await tutionRepository.getMyDetails(req.body);
    this.handleResponse(result, res);
  };
  rate = async (req, res) => {
    console.log("RATE FIRED");
    let result = await tutionRepository.rate(req.body);
    this.handleResponse(result, res);
  };
  getFeedbacks = async (req, res) => {
    let result = await tutionRepository.getFeedbacks(req.body);
    this.handleResponse(result, res);
  };
}

module.exports = TutionController;
