import express from "express";
import multer from "multer";

import { upLoad } from '../controllers/firebaseController.js';
const router = express.Router();

router.get("/", (req, res) => {
    // #swagger.ignore = true
    res.render("index", { title: "結帳失敗" });
});

// 設定 Multer 的存儲設定
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
    "/upload",
    /* 	#swagger.tags = ['FireBase']
          #swagger.description = '上傳圖片' 
              #swagger.parameters['obj'] = {
            in: 'body',
            description: 'FormData 格式的資料',
            required: true,
            schema: new FormData()
          }
            #swagger.responses[200] = { 
        schema: {
            success: "成功或失敗",
            message: "錯誤時的訊息",
            data: "上傳成功後的url"
      } */
    upload.single('file'),
    upLoad
)

export default router;
