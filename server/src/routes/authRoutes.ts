import {
  signupUser,
  completeAccountCreation,
  loginUser,
} from "../controllers/authControllers";
import express, { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account using email, password, and display name.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - display_name
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@email.com"
 *                 description: "Must be a valid email address."
 *               password:
 *                 type: string
 *                 example: "johndoe.1234!!"
 *                 description: "Must be at least 8 characters long and include uppercase, lowercase, number, and special character."
 *               display_name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "User's display name."
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Optional user avatar image file.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "66fcd3d97b12a2034a0fbc23"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 role:
 *                   type: string
 *                   example: "buyer"
 *       400:
 *         description: Missing or invalid credentials.
 *       500:
 *         description: Server error.
 */

router.post("/signup", upload.single("avatar"), signupUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user with email and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66fcd3d97b12a2034a0fbc23"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /api/auth/complete-account:
 *   post:
 *     summary: Complete user account creation
 *     description: Update a user's account with required fields like role, and optional seller-specific fields. Marks the account as completed.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: "The email of the user to complete."
 *               role:
 *                 type: string
 *                 enum: ["buyer", "seller"]
 *                 example: "seller"
 *                 description: "The role to assign to the user."
 *     responses:
 *       200:
 *         description: Account completed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account completed successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "66fcd3d97b12a2034a0fbc23"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "seller"
 *                     account_completed:
 *                       type: boolean
 *                       example: true
 *                     business_name:
 *                       type: string
 *                       example: "Tech Supplies Ltd"
 *                     business_description:
 *                       type: string
 *                       example: "Supplier of tech gadgets."
 *       400:
 *         description: Missing required fields or invalid input.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

router.post("/complete-account", express.json(), completeAccountCreation);

router.post("/login", express.json(), loginUser);

export default router;
