require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const appRoutes = require("./route/appRoutes");
const initdb = require("./initdb");
// db.execute(require("./sql/schema"), {});
// const corsOption = {
//   origin: "http://localhost:8080",
//   credential: true,
//   optionSuccessStatus: 200,
// };
// initdb();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

const apiVersion = "/api/v1.0.0";
app.use(apiVersion, appRoutes);
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
