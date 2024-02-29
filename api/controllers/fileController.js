import sequelize from "../config/db.js";

import initModels from "../models/init-models.js";

const models = initModels(sequelize);

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

    const file = await models.files.findByPk(fileId, {});
    if (!file) {
        res.status(500).json({ message: "INTERNALE SERVER ERROR" });
      }
      res.status(200).json(file);


  } catch (error) {
    res.status(400).json(error);
  }
};
