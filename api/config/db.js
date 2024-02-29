import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

// Load the environment variables
dotenv.config({ path: envFile });
const sequelize = new Sequelize(
    process.env["DB_NAME"],
    process.env["DB_USER"],
    process.env["DB_PASSWORD"],
    {
      host: process.env["DB_HOST"],
      dialect: process.env["DB_DIALECT"],
      port: process.env["DB_PORT"],
    }
  );
  
  sequelize
    .authenticate()
    .then(() => {
      console.log("DATABASE CONNECTED");
    })
    .catch((err) => {
      console.log(err);
    });
  
  export default sequelize;
  

