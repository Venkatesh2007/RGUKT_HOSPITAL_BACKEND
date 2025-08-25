const jwt = require("jsonwebtoken");
const generateJwtToken = (userId, role) => {
  const payload = {
    userId,
    role,
  };
  const jwtToken = jwt.sign(payload, "Nithin");
  return jwtToken;
};

module.exports = generateJwtToken;
