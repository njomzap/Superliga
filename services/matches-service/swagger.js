const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Matches Service API",
      version: "1.0.0",
      description: "API documentation for Matches service",
    },
    servers: [
      { url: "http://localhost:5001", description: "Matches service" }, 
    ],
  },
  apis: ["./routes/*.js"], // point to your route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
