import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes.js";

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";
import { packetRoutes } from "./routes/packetRoutes.js";
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

 dotenv.config({ path: envFile });

const options = {
    definition: {
      openapi: '3.0.0', 
      info: {
        title: 'MyRouting API documentation',
        version: '1.0.0',
 
      },
    },
    apis: ['./routes/*.js'], 
  };
  
  const openapiSpecification = swaggerJsdoc(options);

const port = process.env.PORT || 3000;

const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: '*' }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api", userRoutes);
app.use("/api", packetRoutes);


app.listen(port, () => {
    console.log(`Routing App listening on port ${port}`);
  });