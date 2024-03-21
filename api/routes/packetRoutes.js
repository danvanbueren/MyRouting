import express from "express";

import { getPackets, getPacketById, createPacket, editPacketById, deletePacketById } from "../controllers/packetController.js";

import packet from "../models/packet.js";
import { downloadFile,deleteFileById } from "../controllers/fileController.js";
import { userUpload } from "../config/multerConfig.js";
import multer from 'multer';

export const packetRoutes = express.Router();

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

/**
 * @openapi
 * /api/packets:
 *   post:
 *     tags:
 *       - Packets
 *     summary: Creates a new packet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacketDetail'
 *     responses:
 *       201:
 *         description: Packet created successfully
 *       400:
 *         description: Invalid input data
 */

/**
 * @openapi
 * /api/packets/{packetId}/files/{fileId}:
 *   get:
 *     tags:
 *       - Packets
 *     summary: Downloads a file by ID
 *     parameters:
 *       - in: path
 *         name: packetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The packet's ID
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The file's ID
 *     responses:
 *       200:
 *         description: File downloaded successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 */

/**
 * @openapi
 * /api/packets/{packetId}/files/{fileId}:
 *   delete:
 *     tags:
 *       - Packets
 *     summary: Deletes a file by ID
 *     parameters:
 *       - in: path
 *         name: packetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The packet's ID
 *       - in: path
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The file's ID
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 */

/**
 * @openapi
 * /api/packets/{packetId}:
 *   put:
 *     tags:
 *       - Packets
 *     summary: Edits a packet by ID
 *     parameters:
 *       - in: path
 *         name: packetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The packet's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacketDetail'
 *     responses:
 *       200:
 *         description: Packet updated successfully
 *       404:
 *         description: Packet not found
 */

/**
 * @openapi
 * /api/packets/{packetId}:
 *   delete:
 *     tags:
 *       - Packets
 *     summary: Deletes a packet by ID
 *     parameters:
 *       - in: path
 *         name: packetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The packet's ID
 *     responses:
 *       200:
 *         description: Packet deleted successfully
 *       404:
 *         description: Packet not found
 */



packetRoutes.get("/packets", getPackets);
packetRoutes.get("/packets/:packetId", getPacketById);
packetRoutes.get("/packets/:packetId/files/:fileId", downloadFile);
packetRoutes.delete("/packets/:packetId/files/:fileId", deleteFileById);
packetRoutes.put("/packets/:packetId", editPacketById);
packetRoutes.delete("/packets/:packetId", deletePacketById);


  
packetRoutes.post(
    "/packets",
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