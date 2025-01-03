// src/swagger.ts
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "https://special-umbrella-g9r55675p4rhw5xw-3000.app.github.dev/api/v1", // Change as needed
      },
    ],
  },
  apis: ["./src/api/**/*.ts"], // Adjust the glob pattern to match your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
