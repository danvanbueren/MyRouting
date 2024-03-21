import sequelize from "../config/db.js";

import initModels from "../models/init-models.js";
import { Op } from "sequelize";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



const currentDir = path.dirname(fileURLToPath(import.meta.url));


const rootDir = path.resolve(currentDir, '../');
const tempUploadsDir = path.join(rootDir, 'private', 'temp');

const models = initModels(sequelize);
export const createPacket = async (req, res) => {
  try {

    const t = await sequelize.transaction(); // Start a transaction

    const packetDetails = req.body.data;

    // Create the new packet record with information from req.body
    const newPacket = await models.packet.create({
      name: packetDetails.name,
      type: packetDetails.type,
      comments: packetDetails.comments,
      creator: packetDetails.creator,
      createdAt: packetDetails.createdAt || new Date(), // Use current date if not provided
    },  {
       transaction: t
    });

    if(!newPacket){
      await t.rollback();
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });

    }
/*
    // Process uploaded files (if any)
    const filePromises = (req.document || []).map(file => {
      return models.file.create({
        name: file.originalname, // Use the original file name
        createdAt: new Date(), // Use the upload date
        packetId: newPacket.packetId,
      });
    });
*/
   // Process uploaded files and associate them with `newPacket.packetId`
    // Define the final destination directory for the uploaded files
    const finalDest = path.join(rootDir, 'private', String(newPacket.packetId));
    fs.mkdirSync(finalDest, { recursive: true });

    // Move files from the temp directory to the final destination
    const filePromises = (req.files || []).map(file => {
      const tempPath = path.join(tempUploadsDir, file.filename);

      const originalName = file.originalname; // Get the original file name
      const finalPath = path.join(finalDest, originalName); // Use the original file name in the final path
      fs.renameSync(tempPath, finalPath);

      // Create file records in the database, if necessary
      return models.file.create({
        name: originalName,
        createdAt: new Date(),
        packetId: newPacket.packetId,
      }, {transaction: t
     });
    });


    // Process phases (if any)
    const phasePromises = (packetDetails.phases || []).map(phase => {
      return models.packetPhase.create({
        suspense: phase.suspense,
        comments: phase.comments,
        stepNumber: phase.stepNumber,
        completionDate: phase.completionDate ? phase.completionDate : null,
        phase: phase.phase,
        assignee: phase.assignee,
        packetId: newPacket.packetId,
      }, {transaction: t
      });
    });

    // Wait for all promises (files and phases) to resolve
    await Promise.all([...filePromises, ...phasePromises]);



    await t.commit(); // If everything went well, commit the transaction.

    // Fetch the created packet with its relations
    const packet = await models.packet.findByPk(newPacket.packetId, {
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!packet) {
      return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }

    res.status(201).json(packet);
  } catch (error) {
    await t.rollback();

    res.status(400).json({ message: "An error occurred", error });
  }
};
export const editPhaseById = async (req, res) => {
  try {
    const { packetPhaseId } = req.params;
    const { suspense, closeOutDate, comments, stepNumber, completionDate, phase, assignee, completed } = req.body;

    const updatedPhase = await models.packetPhase.update(
      {
        suspense,
        closeOutDate,
        comments,
        stepNumber,
        completionDate,
        phase,
        assignee,
        completed
      },
      {
        where: { packetPhaseId },
      }
    );

    if (updatedPhase[0] === 0) {
      res.status(404).json({ message: "Phase not found" });
    } else {
      res.status(200).json({ message: "Phase updated successfully" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
export const editPacketPhases = async (req, res) => {
  try {
    const packetId = req.params.packetId;
    const updatedPhases = req.body;
    const t = await sequelize.transaction(); // Start a transaction

    // Find the packet by packetId
    const packet = await models.packet.findByPk(packetId, {
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!packet) {
      res.status(404).json({ message: "Packet not found" });
      return;
    }

    // Update each phase in the packet
    const updatedPhasePromises = updatedPhases.map(async (updatedPhase) => {
      const phase = packet.phases.find((p) => p.phaseId === updatedPhase.phaseId);
      if (phase) {
        await phase.update(updatedPhase, {transaction: t});
      }
    });

    await Promise.all(updatedPhasePromises);

    await t.commit(); // If everything went well, commit the transaction.

    // Fetch the updated packet with the updated phases
    const updatedPacket = await models.packet.findByPk(packetId, {
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    res.status(200).json(updatedPacket);
  } catch (error) {
    await t.rollback();
    res.status(400).json(error);
  }
};

export const addPacketPhases = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const packetId = req.params.packetId;
    const newPhases = req.body;

    // Find the packet by packetId
    const packet = await models.packet.findByPk(packetId, {
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
      ],
      transaction: t,
    });

    if (!packet) {
      await t.rollback();
      res.status(404).json({ message: "Packet not found" });
      return;
    }

    // Create new phases and associate them with the packet
    const newPhasePromises = newPhases.map(async (newPhase) => {
      await models.packetPhase.create({
        suspense: newPhase.suspense,
        comments: newPhase.comments,
        stepNumber: newPhase.stepNumber,
        completionDate: newPhase.completionDate ? newPhase.completionDate : null,
        phase: newPhase.phase,
        assignee: newPhase.assignee,
        packetId: packet.packetId,
        transaction: t,
      });
    });

    await Promise.all(newPhasePromises);

    // Increment the currentPhase of the packet by 1
  //  await packet.increment("currentPhase", { by: 1, transaction: t });

    // Fetch the updated packet with the new phases
    const updatedPacket = await models.packet.findByPk(packetId, {
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
      ],
      transaction: t,
    });

    await t.commit();
    res.status(200).json(updatedPacket);
  } catch (error) {
    await t.rollback();
    res.status(400).json(error);
  }
};

    



export const getPackets = async (req, res) => {
  try {
    const packets = await models.packet.findAll({
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!packets) {
      res.status(500).json({ message: "INTERNAL SERVER ERROR" });
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
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
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

export const deletePacketById = async (req, res) => {
  try {
    const packetId = req.params.packetId;

    const deletedPacket = await models.packet.destroy({ 
      where: { packetId: packetId },
      cascade: true 
    });

    const finalDest = path.join(rootDir, 'private', String(packetId));
    await fs.remove(finalDest); 

    if (!deletedPacket) {
      res.status(404).json({ message: "Packet not found" });
    } else {
      res.status(200).json({ message: "Packet deleted successfully" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
/*
export const editPacketById = async (req, res) => {
  try {
    const packetId = req.params.packetId;
    const updatedPacket = req.body;

    // Update the packet using the packetId and updatedPacket data
    const [rowsUpdated, [updatedPacketData]] = await models.packet.update(updatedPacket, {
      where: { packetId: packetId },
      returning: true,
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        { model: models.packetPhase, as: "phases", include: [{ model: models.user, as: "assigneeUser" }] }
      ]
    });

    if (rowsUpdated === 0) {
      res.status(404).json({ message: "Packet not found" });
    } else {
      res.status(200).json(updatedPacketData);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
*/
export const editPacketById = async (req, res) => {
  const t = await sequelize.transaction(); // Start a transaction
  try {
    const packetId = req.params.packetId;
    const {
      name, type, comments, currentPhase, creator, createdAt, files, creatorUser, phases,
    } = req.body;

    // Update the main packet
    const [rowsUpdated] = await models.packet.update({
      name, type, comments, currentPhase, creator, createdAt
    }, {
      where: { packetId },
      returning: true,
       transaction: t
    });

    if (rowsUpdated === 0) {
        await t.rollback();
      return res.status(404).json({ message: "Packet not found" });
    }

    // Assuming files, creatorUser, and phases need to be updated separately.
    // Example for updating associated `files` (Adjust based on actual models and logic)
    // Similarly, you'd update `creatorUser` and `phases`, including nested updates for `assigneeUser`

    // Example of updating phases and nested assigneeUser
    if (phases && phases.length > 0) {
      for (const phase of phases) {
        await models.packetPhase.update({ ...phase }, {
          where: { packetPhaseId: phase.packetPhaseId },
           transaction: t
        });

        // Update the assigneeUser if provided
        if (phase.assigneeUser) {
          await models.user.update({ ...phase.assigneeUser }, {
            where: { userId: phase.assigneeUser.userId },
             transaction: t
          });
        }
      }
    }

     await t.commit(); // If everything went well, commit the transaction.

    // Fetch the updated packet data with associations to return in response (this step is optional)
    const updatedPacketData = await models.packet.findByPk(packetId, {
      include: [
        { model: models.file, as: "files" },
        { model: models.user, as: "creatorUser" },
        {
          model: models.packetPhase,
          as: "phases",
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    res.status(200).json(updatedPacketData);
  } catch (error) {
     await t.rollback(); // Rollback the transaction on error
    res.status(400).json({ message: "An error occurred while updating the packet.", error });
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
          include: [{ model: models.user, as: "assigneeUser" }],
          order: [["createdAt", "DESC"]],
        },
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