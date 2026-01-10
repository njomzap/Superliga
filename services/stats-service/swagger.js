const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stats Service API",
      version: "1.0.0",
      description: "API documentation for the Stats microservice",
    },
    servers: [
      {
        url: "http://localhost:5003", // use your stats service port
        description: "Local Stats Service",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // <-- make sure this path matches your stats route folder
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
