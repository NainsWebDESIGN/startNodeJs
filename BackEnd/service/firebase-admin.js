import admin from 'firebase-admin';
import dotenv from "dotenv";
dotenv.config(); // 載入.env 檔案

const rePlace = data => {
    if (!data) {
        console.log("data is null");
        return "";
    }
    return data.replace(/\\n/g, '\n');
}

// 初始化 Firebase Admin SDK
// 載入 Firebase Admin 資源配置
const {
    FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_STORAGE_BUCKET,
} = process.env;

admin.initializeApp({
    credential: admin.credential.cert({
        type: 'service_account',
        project_id: FIREBASE_PROJECT_ID,
        private_key_id: FIREBASE_PRIVATE_KEY_ID,
        private_key: rePlace(FIREBASE_PRIVATE_KEY),
        client_email: FIREBASE_CLIENT_EMAIL,
    }),
    storageBucket: FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

export default bucket;