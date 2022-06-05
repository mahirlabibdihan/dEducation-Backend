const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./route/authRoutes");
app.use(cors());
app.use(express.json());

const apiVersion = "/api/v1.0.0";
app.use(apiVersion + "/auth", authRoutes);
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
