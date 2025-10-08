import { signupUser, loginUser } from "../controllers/authControllers";
import { Router } from "express";

const router = Router();

// /**
//  * @swagger
//  * /api/users:
//  *   get:
//  *     summary: Get all users
//  *     tags: [Users]
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:
//  *                     type: string
//  *                   name:
//  *                     type: string
//  */

/**
 * @swagger
 * /api/auth/signup:
 */

router.post("/signup", signupUser);

router.post("/login", loginUser);

export default router;
