import sequelize from "../config/db.js";

import initModels from "../models/init-models.js";
import { Op } from "sequelize";

const models = initModels(sequelize);

export const getUsers = async (req, res) => {

    try {
      
        const { grade, firstName, lastName, email } = req.query;

        let whereClause = {};
        
        if (grade && grade !== 'ALL') {
          whereClause.grade = grade;
        }
        if (firstName) {
          whereClause.firstName = { [Op.like]: `%${firstName}%` };
        }
        if (lastName) {
          whereClause.lastName = { [Op.like]: `%${lastName}%` };
        }
        if (email) {
             whereClause.email = { [Op.like]: `%${email}%` };
       }
        
      
        const users = await models.user.findAll({
          where: whereClause,
        });
    
        if (!users) {
            res.status(500).json({ message: "INTERNALE SERVER ERROR" });
          }
          res.status(200).json(users);
    
    
      } catch (error) {
        res.status(400).json(error);
      }



};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await models.user.findByPk(userId, {});
    if (!user) {
        res.status(500).json({ message: "INTERNALE SERVER ERROR" });
      }
      res.status(200).json(user);


  } catch (error) {
    res.status(400).json(error);
  }
};


