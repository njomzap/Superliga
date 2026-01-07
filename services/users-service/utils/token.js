const jwt = require("jsonwebtoken");

const ACCESS_SECRET =
  process.env.JWT_SECRET || "dev_access_secret";

const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "dev_refresh_secret";

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
