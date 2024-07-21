const { serve } = require("swagger-ui-express");

const swaggerAutogen = require("swagger-autogen")();


const doc = {
  info: {
    title: "Nains API",
    description: "學習 Node.js 的心路歷程",
  },
  basePath: "/",
  schemes: ["https"],
  host: "backexample.zebur.app"
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
