const router = require("express").Router();
const res = require("express/lib/response");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const tuitionRoutes = require("./tuitionRoutes");
const coachingRoutes = require("./coachingRoutes");
router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/tuition", tuitionRoutes);
router.use("/coaching", coachingRoutes);

module.exports = router;
