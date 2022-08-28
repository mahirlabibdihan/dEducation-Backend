const Controller = require("./base");
const CourseRepository = require("../repository/courseRepository");
const courseRepository = new CourseRepository();
const ProfileRepository = require("../repository/profileRepository");
const profileRepository = new ProfileRepository();
class CourseController extends Controller {
  constructor() {
    super();
  }
  create = async (req, res) => {
    let result = await courseRepository.create(req.body);
    this.handleResponse(result, res);
  };

  enroll = async (req, res) => {
    const result2 = await profileRepository.getAllSchedule(req.body);
    req.body["id"] = req.body.student_id;
    const result3 = await courseRepository.getBatchDetails(req.body);
    if (result2.success && result3.success) {
      const scheduleList = result2.data;
      const batch = result3.data;
      for (let i = 0; i < scheduleList.length; i++) {
        // console.log(scheduleList[i], batch);
        const days1 = scheduleList[i].CLASS_DAYS.split(", ");
        const days2 = batch.CLASS_DAYS.split(", ");
        // console.log(days1, days2);
        for (let j = 0; j < days1.length; j++) {
          for (let k = 0; k < days2.length; k++) {
            if (days1[j] === days2[k]) {
              const start1 = new Date(
                scheduleList[i].START_TIME.toString().slice(0, -1)
              );
              const start2 = new Date(batch.START_TIME.toString().slice(0, -1));
              const end1 = new Date(
                scheduleList[i].END_TIME.toString().slice(0, -1)
              );
              const end2 = new Date(batch.END_TIME.toString().slice(0, -1));
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
      let result = await courseRepository.enroll(req.body);
      this.handleResponse(result, res);
    }
  };
  approveEnrollment = async (req, res) => {
    let result = await courseRepository.approveEnrollment(req.body);
    this.handleResponse(result, res);
  };
  declineEnrollment = async (req, res) => {
    let result = await courseRepository.declineEnrollment(req.body);
    this.handleResponse(result, res);
  };
  cancelEnrollment = async (req, res) => {
    let result = await courseRepository.cancelEnrollment(req.body);
    this.handleResponse(result, res);
  };
  addBatch = async (req, res) => {
    let result = await courseRepository.addBatch(req.body);
    this.handleResponse(result, res);
  };
  getClassOptions = async (req, res) => {
    const result = await courseRepository.getClassOptions(req.body);
    this.handleResponse(result, res);
  };
  getSubjectOptions = async (req, res) => {
    const result = await courseRepository.getSubjectOptions(req.body);
    this.handleResponse(result, res);
  };
  getBatchOptions = async (req, res) => {
    const result = await courseRepository.getBatchOptions(req.body);
    this.handleResponse(result, res);
  };
  getBatches = async (req, res) => {
    const result = await courseRepository.getBatches(req.body);
    this.handleResponse(result, res);
  };
  getMyList = async (req, res) => {
    const result = await courseRepository.getMyList(req.body);
    this.handleResponse(result, res);
  };
  getMyListAdmin = async (req, res) => {
    const result = await courseRepository.getMyListAdmin(req.body);
    this.handleResponse(result, res);
  };
  addCourse = async (req, res) => {
    let result = await courseRepository.addCourse(req.body);
    this.handleResponse(result, res);
  };
}

module.exports = CourseController;
