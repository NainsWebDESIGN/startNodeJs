var express = require("express");
var app = express(); // 產生 Express Application 物件
var port = 4200;

app.get("/", (req, res) => {
  res.send("Hello <b>Nains</b>");
});
app.get("/mypath", (req, res) => {
  res.send("This is my path");
});
app.get("/ttt", (req, res) => {
  res.send(
    JSON.stringify([
      { ttt: "TTT" },
      { ttt: "EEE" },
      { ttt: "SSS" },
      { ttt: "TTT" },
    ])
  );
  // res.send("ttt");
});
app.listen(port, () =>
  console.log(`Server running at http://127.0.0.1:${port}/`)
);
