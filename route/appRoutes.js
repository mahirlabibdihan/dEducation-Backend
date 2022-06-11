const router = require("express").Router();
const res = require("express/lib/response");
const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
module.exports = router;
