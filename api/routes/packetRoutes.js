import express from "express";

import { getPackets, getPacketById, createPacket, editPacketById, deletePacketById } from "../controllers/packetController.js";

import packet from "../models/packet.js";
import { downloadFile,deleteFileById } from "../controllers/fileController.js";
import { userUpload } from "../config/multerConfig.js";
import multer from 'multer';

export const packetRoutes = express.Router();



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