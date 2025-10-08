import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN store backend API.",
      version: "1.0.0",
      description: "API documentation for the Mern Store backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development server",
      },
      {
        url: "http://localhost:3000",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
