const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users Service API",
      version: "1.0.0",
      description: "API documentation for the Users microservice",
    },
    servers: [
      {
        url: "http://localhost:5002", // change if your Users service uses a different port
        description: "Local Users Service",
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
  apis: ["./routes/*.js"], // all route files in this folder
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
