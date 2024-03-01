import sequelize from "../config/db.js";

import initModels from "../models/init-models.js";
import { Op } from "sequelize";

const models = initModels(sequelize);

export const createPacket = async (req, res) => {
  try {
    const { name, description, creator } = req.body;

    const packet = await models.packet.create({
      name,
      description,
      creator
    });

    res.status(201).json(packet);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const getPackets = async (req, res) => {

    try {
      
      
    
        const packets = await models.packet.findAll( {     include: [
          { model: models.file, as: "files" },
          {model: models.user, as: "creatorUser"},
          { model: models.packetPhase, as: "phases", include: [{ model: models.user, as: "assigneeUser" }] }
        ]
        });
    
        if (!packets) {
            res.status(500).json({ message: "INTERNALE SERVER ERROR" });
          }
          res.status(200).json(packets);
    
    
      } catch (error) {
        res.status(400).json(error);
      }



};

export const getPacketById = async (req, res) => {
  try {
    const packetId = req.params.packetId;
    const packet = await models.packet.findByPk(packetId, {
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        { model: models.packetPhase, as: "phases", include: [{ model: models.user, as: "assigneeUser" }] }
      ]
    });

 
    if (!packet) {
        res.status(500).json({ message: "INTERNALE SERVER ERROR" });
      }
      res.status(200).json(packet);


  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserPackets = async (req, res) => {
  try {
    const userId = req.params.userId;


    const packets = await models.packet.findAll({
      include: [
        {
          model: models.file,
          as: "files",
        },
        {model: models.user, as: "creatorUser"},
        {
          model: models.packetPhase,
          as: "phases",
          required: false, 
          include: [{ model: models.user, as: "assigneeUser" }]
          
        }
      ],
      where: {
        [Op.or]: [
          { creator: userId }, // Packets where the user is the creator
          // Include packets where the user is an assignee in any phase
          // This condition doesn't filter phases; it's used to include packets
          { '$phases.assignee$': userId }
        ]
      },
      subQuery: false
    });
   
    if (!packets) {
        res.status(500).json({ message: "INTERNALE SERVER ERROR" });
      }
      res.status(200).json(packets);


  } catch (error) {
    res.status(400).json(error);
  }
};