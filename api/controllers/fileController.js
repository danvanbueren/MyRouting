import sequelize from "../config/db.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import initModels from "../models/init-models.js";

const models = initModels(sequelize);


const currentDir = path.dirname(fileURLToPath(import.meta.url));


const rootDir = path.resolve(currentDir, '../');

export const downloadFile = async (req, res) => { 
  try {
    const packetId = req.params.packetId;
    const fileId = req.params.fileId;
    const file = await models.file.findByPk(fileId, {});
    if (!file) {
        res.status(500).json({ message: "INTERNALE SERVER ERROR" });
      }



      let filePath = path.join(rootDir, "private", file.packetId, file.name);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set headers to serve the file inline
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="' + file.name + '"');

      // Create a read stream and pipe it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error serving the file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getFiles = async (req, res) => {

    try {
      
    
        const files = await models.files.findAll({});
        if (!files) {
            res.status(500).json({ message: "INTERNALE SERVER ERROR" });
          }
          res.status(200).json(files);
    
    
      } catch (error) {
        res.status(400).json(error);
      }



};

export const getFileById = async (req, res) => {
  try {
    const fileId = req.params.fileId;

    const file = await models.file.findByPk(fileId, {});
    if (!file) {
        res.status(500).json({ message: "INTERNALE SERVER ERROR" });
      }
      res.status(200).json(file);


  } catch (error) {
    res.status(400).json(error);
  }
};
