const express = require("express");
const router = express.Router();
// 假資料庫
const data = require("../public/json/data.json");

/* GET home page. */
router.get("/product", (req, res) => {
  res.send({
    success: true,
    data,
  });
  res.end();
});

router.post("/product", (req, res) => {
  const product = req.body;
  data.push({
    id: data[data.length - 1].id + 1,
    ...product,
  });

  res.send({
    success: true,
    data,
  });

  res.end();
});

router.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  //   console.log(req);

  data.forEach((item, index) => {
    if (item.id == id) {
      data.splice(index, 1);
    }
  });

  res.send({
    success: true,
    data,
  });

  res.end();
});

module.exports = router;
