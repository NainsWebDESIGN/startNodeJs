import { Form } from '../service/dataFrom.js';
import bucket from '../service/firebase-admin.js';
import multer from "multer";

export const File = (req, res, next) => {
    // 設定 Multer 的存儲設定
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    upload.single('file');
    req.file = upload.file;
    next();
}

export const upLoad = (req, res) => {
    // console.log("file", req.file);

    // 檢查是否有文件被上傳
    if (!req.file) {
        res.status(400).send(Form(false, {}, '沒有檔案上傳'));
        return;
    }

    // 創建一個參考到 Firebase Storage 的文件，使用上傳的文件名
    const blob = bucket.file(req.file.originalname);

    // 創建一個寫入流來上傳文件到 Firebase Storage
    const blobStream = blob.createWriteStream({
        metadata: {
            // 設定文件的 MIME 類型
            contentType: req.file.mimetype,
        },
    });

    // 如果上傳過程中出現錯誤，返回 500 狀態碼和錯誤訊息
    blobStream.on('error', (error) => {
        res.status(500).send(Form(false, {}, error));
    });

    // 當文件上傳完成時，回傳文件在 Firebase Storage 的公開 URL
    blobStream.on('finish', () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;
        res.status(200).send(Form(true, publicUrl));
    });

    // 開始上傳文件，使用上傳的文件 buffer
    blobStream.end(req.file.buffer);
}