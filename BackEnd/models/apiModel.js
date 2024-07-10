const database = require("../public/js/database.js");
class ApiModel {
  constructor() {
    this.todos;
  }

  //取得全部
  getAll() {
    return database
      .query("SELECT * FROM todos")
      .then((res) => res)
      .catch((err) => console.log("err", err));
  }

  //新增資料
  create(todo) {
    const { title } = todo;
    return database
      .query(`INSERT INTO todos VALUES(NULL, '${title}')`)
      .then((res) => (res.affectedTows !== 0) ? "OK" : res.message)
      .catch((err) => console.log("err", err));
  }

  // 更新資料
  update(req) {
    const { id } = req.params;
    const { title } = req.body;

    return database
      .query(`UPDATE todos SET title='${title}' WHERE id='${id}'`)
      .then((res) => (res.changedRows !== 0) ? "OK" : res.message)
      .catch((err) => console.log("err", err));
  }

  truncate() {
    return database
      .query('TRUNCATE TABLE todos')
      .then((res) => "OK")
      .catch((err) => console.log("err", err));
  }

  // 刪除資料
  async delete(params, data) {
    const trun = this.truncate();
    const { id } = params;
    //! 如要刪除多個可以從 id=${id} 設置成 id IN(${id.join(",")})
    data = data.filter(item => item.id !== id).map(item => `(NULL, '${item.title}')`);

    console.log("data", data);

    return trun.finally(() => {
      return database
        .query(`INSERT INTO todos VALUES ${data.join(",")}`)
        .then((res) => {
          console.log(res);
          return (res.affectedRows !== 0) ? "OK" : res.message;
        })
        .catch((err) => console.log("err", err));
    })
    return "OK";
  }
}

module.exports = new ApiModel();
