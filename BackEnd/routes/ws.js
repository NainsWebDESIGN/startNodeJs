import WebSocket, { WebSocketServer } from "ws";

import { v4 as uuid } from "uuid";

const wss1 = new WebSocketServer({ noServer: true });

wss1.on(
  "connection",
  // #swagger.ignore = true
  function connection(ws) {
    ws.on("error", console.error);
    console.log("連線成功 / WebSocket connection Succes");

    const uid = uuid();

    ws.uuid = uid; // 判斷哪一個用戶使用

    // 發出第一個訊息給用戶，表示用戶是誰
    const user = {
      context: "user",
      uid,
    };

    // 發訊息給用戶
    ws.send(JSON.stringify(user)); // 只能發送字串

    // 監聽
    ws.on("message", (message) => {
      const msg = JSON.parse(message);

      const newMessage = {
        context: "message",
        uid,
        content: msg.content,
      };

      // 回傳
      // ws.send(JSON.stringify(newMessage));
      sendAllUser(newMessage);
    });
  }
);

// 推播
function sendAllUser(msg) {
  wss1.clients.forEach((client) => {
    // 已建立連線，並且排除自身
    if (client.readyState === WebSocket.OPEN && client.uuid !== msg.uid) {
      client.send(JSON.stringify(msg));
    }
  });
}

export default wss1;
