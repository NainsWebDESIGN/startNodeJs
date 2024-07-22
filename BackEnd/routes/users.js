const express = require("express");
const router = express.Router();
const err = require("../service/catchError");
const usersController = require("../controllers/usersController");

// 1. 註冊
router.post(
  "/signup",
  /* 	#swagger.tags = ['Users']
      #swagger.description = '註冊'
      #swagger.parameters['obj'] = {
        in: 'body',
        description: '註冊內容',
        required: true,
        schema: {
          email: "test@gmail.com",
          password: "123456",
          username: "Nains",
        }
      }
      #swagger.responses[200] = { 
        schema: {
          success: "成功或失敗",
          message: "錯誤時的訊息",
          data: { message: "註冊成功" }
        }
      } */
  err.catch(usersController.SignUp)
);

// 2. 登入
router.post(
  "/login",
  /* 	#swagger.tags = ['Users']
    #swagger.description = '登入' 
    #swagger.parameters['obj'] = {
      in: 'body',
      description: '登入內容',
      required: true,
      schema: {
        email: "test@gmail.com",
        password: "123456",
      }
    } 
    #swagger.responses[200] = { 
      schema: {
            success: "成功或失敗",
            message: "錯誤時的訊息",
            data: {
              message: "登入成功",
              status: "登入成功的Token"
            }
      }
    } */
  err.catch(usersController.Login)
);

// 3. 驗證用戶(同時取得用戶資料)
router.get(
  "/profile",
  /* 	#swagger.tags = ['Users']
      #swagger.description = '驗證，token須放在headers的Authorization'
      #swagger.parameters['headers'] = {
        in: 'Authorization',
        type: 'string',
        description: '加密後的Token' 
      }
      #swagger.responses[200] = { 
        schema: {
          success: "成功或失敗",
          message: "錯誤時的訊息",
          data: {
            message: "成功",
            status: "解密後的會員資料"
          }
        }
      } */
  err.catch(usersController.Profile)
);

router.post(
  "/logout",
  /* 	#swagger.tags = ['Users']
      #swagger.description = '登出，token須放在headers的Authorization'
      #swagger.parameters['headers'] = {
        in: 'Authorization',
        type: 'string',
        description: '加密後的Token' 
      }
      #swagger.responses[200] = { 
        schema: {
            success: "成功或失敗",
            message: "錯誤時的訊息",
            data: {
              message: "OK"
            }
        }
      } */
  err.catch(usersController.Logout)
);

module.exports = router;
