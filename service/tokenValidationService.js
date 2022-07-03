const jwt = require("jsonwebtoken");
const AuthRepository = require("../repository/authRepository");

const authRepository = new AuthRepository();

async function tokenValidationMiddleware(req, res, next) {
  console.log("Authentication");
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(403).send({ error: "access denied" });
  console.log(token);
  jwt.verify(token, process.env.jwt_secret, async (err, data) => {
    console.log("data" + data + err);
    if (err || !("email" in data))
      return res.status(403).send({ error: "access denied" });
    console.log(data);
    var isValid = await authRepository.tokenValidity(
      data.id,
      data.email,
      data.pass
    ); //checking whether the current password is the same
    if (!isValid) return res.status(403).send({ error: "access denied" });
    req.body["user_id"] = data.id;
    next();
  });
}

module.exports = tokenValidationMiddleware;
