import express from "express";

import { getUsers, getUserById } from "../controllers/userController.js";
import { createPacket, editPacketById, getUserPackets , deletePacketById, editPacketPhases, addPacketPhases, editPhaseById} from "../controllers/packetController.js";
import { downloadFile, uploadFile, deleteFileById } from "../controllers/fileController.js";
import { userUpload } from "../config/multerConfig.js";
import multer from 'multer';

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


 
userRoutes.get("/users/:userId", getUserById);


 
userRoutes.get("/users/:userId/packets", getUserPackets);


userRoutes.get("/users/:userId/packets/:packetId/files/:fileId", downloadFile);
  userRoutes.post(
    "/users/:userId/packets",
        userUpload.array('files') ,
           (req, res, next) => {
          if (req.body.data) {
            // Attempt to parse the JSON data
            try {
              req.body.data = JSON.parse(req.body.data);
            } catch (error) {
              return res.status(400).json({ error: "Invalid JSON format in 'data' field." });
            }
          }
          next();
        },
        createPacket,
        // Error handling middleware
        // ...
      );


  userRoutes.delete("/users/:userId/packets/:packetId/files/:fileId", deleteFileById);
  userRoutes.put("/users/:userId/packets/:packetId", editPacketById);
  userRoutes.put("/users/:userId/packets/:packetId/phases", editPacketPhases);
  userRoutes.post("/users/:userId/packets/:packetId/phases", addPacketPhases);
  userRoutes.put("/users/:userId/packets/:packetId/phases/:packetPhaseId", editPhaseById);

  userRoutes.delete("/users/:userId/packets/:packetId", deletePacketById);