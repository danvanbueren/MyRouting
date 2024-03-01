import express from "express";

import { getPackets, getPacketById, createPacket } from "../controllers/packetController.js";
import packet from "../models/packet.js";
import { downloadFile } from "../controllers/fileController.js";

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
 *   get:
 *     tags:
 *       - Packets
 *     summary: Returns a list of packets
 *     responses:
 *       200:
 *         description: A JSON array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PacketDetail'
 */
packetRoutes.get("/packets", getPackets);




/**
 * @openapi
 * /api/packets/{packetId}:
 *   get:
 *     tags:
 *       - Packets
 *     summary: Gets a packet by ID
 *     parameters:
 *       - in: path
 *         name: packetId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The packet's ID
 *     responses:
 *       200:
 *         description: A packet object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PacketDetail'
 *       404:
 *         description: Packet not found
 */
packetRoutes.get("/packets/:packetId", getPacketById);


packetRoutes.post("/packets", createPacket);

packetRoutes.get("/packets/:packetId/files/:fileId", downloadFile);