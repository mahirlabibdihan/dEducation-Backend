const express = require("express");
const app = express();
const cors = require("cors");
const loginRoute = require("./routes/users/login.js");
app.use(cors());
app.use(express.json());
app.use("/api/login", loginRoute);
app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
