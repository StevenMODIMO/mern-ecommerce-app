import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const env = (process.env.NODE_ENV as string) || "development";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN store backend API.",
      version: "1.0.0",
      description: "API documentation for the Mern Store backend",
    },
    servers: [
      { url: "http://localhost:3000", description: "Local Development server" },
      {
        url: "https://mern-store-backend-kjd1.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    path.join(
      __dirname,
      `${env === "development" ? "./routes/*.ts" : "./routes/*.js"}`
    ),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
