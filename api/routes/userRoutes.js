import express from "express";

import { getUsers, getUserById } from "../controllers/userController.js";
import { getUserPackets } from "../controllers/packetController.js";


export const userRoutes = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - UID
 *         - firstName
 *         - lastName
 *         - grade
 *         - FK_organizations_UID
 *         - permissionsSelf
 *         - permissionsGroups
 *       properties:
 *         UID:
 *           type: integer
 *           format: int64
 *           description: Auto-incremented ID and primary key.
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         grade:
 *           type: string
 *           description: The user's grade.
 *         FK_organizations_UID:
 *           type: integer
 *           format: int64
 *           description: Foreign key linking to the organizations.
 *         permissionsSelf:
 *           type: string
 *           description: Permissions of the user on their own profile.
 *         permissionsGroups:
 *           type: string
 *           description: Permissions of the user on groups.
 *         FK_users_UID_directRater:
 *           type: integer
 *           format: int64
 *           description: Foreign key pointing to the user's direct rater. Nullable.
 *           nullable: true
 */




/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns a list of users
 *     responses:
 *       200:
 *         description: A JSON array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRoutes.get("/users", getUsers);




/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Gets a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRoutes.get("/users/:userId", getUserById);


userRoutes.get("/users/:userId/packets", getUserPackets);