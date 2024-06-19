exports.catchError = (asyncFun) => {
  return (req, res, next) => {
    asyncFun(req, res, next).catch((err) => {
      console.log("錯誤捕捉: ", err);
      res.status(500).send({
        message: "伺服器錯誤",
        errMsg: err,
      });
    }); // Promise
  };
};
