const oracledb = require("oracledb");
const router = require("express").Router();
const DB_user = require("../../Database/users/DB-user-api");
router.route("/").post(async (req, res) => {
  console.log(req.body);
  let result = await DB_user.getUserByEmail(req.body.email);
  if (result === undefined) {
    res.status(404).send("Invalid email");
  } else if (req.body.password == result.PASSWORD) {
    res.json(result);
  } else {
    res.status(404).send("Invalid password");
  }
});
module.exports = router;
