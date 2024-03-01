import express from "express";

import { getUsers, getUserById } from "../controllers/userController.js";
import { getUserPackets } from "../controllers/packetController.js";
import { downloadFile } from "../controllers/fileController.js";

export const userRoutes = express.Router();

// OpenAPI component schemas
const openAPISchemas = `
/**
 * @openapi
 * components:
 *   schemas:
 *     PacketDetail:
 *       type: object
 *       properties:
 *         packetId:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         comments:
 *           type: string
 *           nullable: true
 *         currentPhase:
 *           type: integer
 *         creator:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         files:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/File'
 *         creatorUser:
 *           $ref: '#/components/schemas/User'
 *         phases:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PacketPhase'
 *     File:
 *       type: object
 *       properties:
 *         fileId:
 *           type: string
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         packetId:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         grade:
 *           type: string
 *         rank:
 *           type: string
 *         branch:
 *           type: string
 *         organizationId:
 *           type: string
 *         raterId:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *     PacketPhase:
 *       type: object
 *       properties:
 *         packetPhaseId:
 *           type: string
 *         suspense:
 *           type: string
 *           format: date
 *         comments:
 *           type: string
 *           nullable: true
 *         stepNumber:
 *           type: integer
 *         completionDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         packetId:
 *           type: string
 *         phase:
 *           type: string
 *         assignee:
 *           type: string
 *         assigneeUser:
 *           $ref: '#/components/schemas/User'
 */
`;

// Route to get a list of users
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

// Route to get a user by ID
/**
 * @openapi
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Gets a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
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

// Route to get a user's packets
/**
 * @openapi
 * /api/users/{userId}/packets:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns a list of packets associated with a user
 *     responses:
 *       200:
 *         description: A JSON array of packet objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PacketDetail'
 */
userRoutes.get("/users/:userId/packets", getUserPackets);

/**
 * @openapi
 * /api/users/{userId}/packets/{packetId}/files/{fileId}:
 *   get:
 *     tags:
 *       - Files
 *     summary: Download a PDF file
 *     description: Downloads a specific PDF file associated with a user's packet.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: path
 *         name: packetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the packet
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to download
 *     responses:
 *       200:
 *         description: The PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       401:
 *         description: Unauthorized - User does not have permission to access this file
 */
userRoutes.get("/users/:userId/packets/:packetId/files/:fileId", downloadFile);