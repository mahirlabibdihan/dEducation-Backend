const router = require("express").Router();
const res = require("express/lib/response");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const tutionRoutes = require("./tutionRoutes");
const coachingRoutes = require("./coachingRoutes");
const tutorRoutes = require("./tutorsRoutes");
router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/tution", tutionRoutes);
router.use("/coaching", coachingRoutes);
router.use("/tutors", tutorRoutes);
module.exports = router;
