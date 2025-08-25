const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const verifyPassword = async (password, dbPassword) => {
  const ans = await bcrypt.compare(password, dbPassword);
  return ans;
};

module.exports = {
  hashPassword,
  verifyPassword,
};
