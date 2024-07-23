import express from "express";
const router = express.Router();
import err from "../service/catchError.js";

import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/apiController.js";

/* GET home page. */
router.get(
  "/product",
  /* 	#swagger.tags = ['Todos']
      #swagger.description = '取得所有Todos' 
      #swagger.responses[200] = { 
        schema: {
          success: "成功或失敗",
          message: "錯誤時的訊息",
          data: [{ id: 1, title: "第一條備忘錄事項" }]
        }
      } */
  err(getAllTodos)
);

router.post(
  "/product",
  /* 	#swagger.tags = ['Todos']
      #swagger.description = '新增 Todo' 
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Todo 內容.',
        required: true,
        schema: { "title": "這是標題" }
      } 
      #swagger.responses[200] = { 
        schema: {
          success: "成功或失敗",
          message: "錯誤時的訊息",
          data: [{ id: 1, title: "第一條備忘錄事項" }]
        }   
      } */
  err(createTodo)
);

router.put(
  "/product/:id",
  /* 	#swagger.tags = ['Todos']
      #swagger.description = '更新 Todo' 
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Todo 修改內容',
        required: true,
        schema: { "title": "這是標題" }
      } 
      #swagger.responses[200] = { 
        schema: {
          success: "成功或失敗",
          message: "錯誤時的訊息",
          data: [{ id: 1, title: "第一條備忘錄事項" }]
        }
      } */
  err(updateTodo)
);

router.delete(
  "/product/:id",
  /* 	#swagger.tags = ['Todos']
      #swagger.description = '刪除特定 Todo' 
      #swagger.responses[200] = { 
        schema: {
          success: "成功或失敗",
          message: "錯誤時的訊息",
          data: [{ id: 1, title: "第一條備忘錄事項" }]
        }
      } */
  err(deleteTodo)
);

export default router;
