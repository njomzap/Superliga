const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  updateProfile,
  changePassword,
  getAllUsers
} = require("../controllers/users.controllers");

const { auth, adminOnly } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

router.get("/me", auth, getMe);
router.put("/me", auth, updateProfile);
router.put("/me/password", auth, changePassword);

router.get("/", auth, adminOnly, getAllUsers);

module.exports = router;
