const { serve } = require("swagger-ui-express");

const swaggerAutogen = require("swagger-autogen")();


const doc = {
  info: {
    title: "Nains API",
    description: "學習 Node.js 的心路歷程",
  },
  basePath: "/",
  schemes: ["https"],
  host: "backexample.zebur.app",
  Todos: {
    resPonse: [{ id: 1, title: "第一條備忘錄事項" }],
  },
  Users: {
    Signup: { message: "註冊成功" },
    Login: { message: "登入成功", status: "加密後的token" },
    Profile: {
      message: "成功",
      status: {
        email: "test@gmail.com",
        username: "Nains",
        password: "123456",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
