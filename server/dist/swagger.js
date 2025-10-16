"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const env = process.env.NODE_ENV || "development";
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
        path_1.default.join(__dirname, `${env === "development" ? "./routes/*.ts" : "./routes/*.js"}`),
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.setupSwagger = setupSwagger;
