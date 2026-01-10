const express = require("express");
const router = express.Router();

// Import controller functions
const {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  getAllUsers,
  getMyMatches,
} = require("../controllers/users.controllers");

// Import middleware
const { auth, adminOnly } = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "JWT_TOKEN_HERE"
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     description: Refreshes the JWT token for a logged-in user.
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "NEW_JWT_TOKEN_HERE"
 */
router.post("/refresh", refreshToken);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logs out a user by invalidating the token.
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     description: Returns information about the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 */
router.get("/me", auth, getMe);

/**
 * @swagger
 * /api/users/me/matches:
 *   get:
 *     summary: Get matches for current user
 *     description: Returns all matches related to the logged-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   matchId:
 *                     type: string
 *                     example: "456"
 *                   team:
 *                     type: string
 *                     example: "Team A"
 *                   date:
 *                     type: string
 *                     example: "2026-01-10"
 */
router.get("/me/matches", auth, getMyMatches);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     description: Returns a list of all users. Only accessible by admin.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 */
router.get("/", auth, adminOnly, getAllUsers);

module.exports = router;
