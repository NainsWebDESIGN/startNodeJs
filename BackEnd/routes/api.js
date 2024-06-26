const express = require("express");
const router = express.Router();
const err = require("../public/js/catchError");
// 假資料庫
const apiController = require("../controllers/apiController");

/* GET home page. */
router.get(
  "/product",
  /* 	#swagger.tags = ['Todos']
      #swagger.description = '取得所有Todos' 
      #swagger.responses[200] = { 
        schema: { $ref: '#/Todos/resPonse' }
      } */
  err.catch(apiController.getAllTodos)
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
        schema: { $ref: '#/Todos/resPonse' }
      } */
  err.catch(apiController.createTodo)
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
        schema: { $ref: '#/Todos/resPonse' }
      } */
  err.catch(apiController.updateTodo)
);

router.delete(
  "/product/:id",
  /* 	#swagger.tags = ['Todos']
      #swagger.description = '刪除特定 Todo' 
      #swagger.responses[200] = { 
        schema: { $ref: '#/Todos/resPonse' }
      } */
  err.catch(apiController.deleteTodo)
);

module.exports = router;
