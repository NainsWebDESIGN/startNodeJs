var express = require("express");
var router = express.Router();

// 假資料庫
const data = [
  {
    id: 1,
    title: "產品資訊",
  },
];

/* GET home page. */
router.get("/product", (req, res, next) => {
  res.send({
    success: true,
    data,
  });
  res.end();
});

router.post("/product", (req, res) => {
  const product = req.body;
  data.push({
    id: new Date().getTime(),
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
