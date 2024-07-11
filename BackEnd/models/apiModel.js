const database = require("../public/js/database.js");
class ApiModel {
  constructor() {
  }

  final = async el => {
    return el ? await this.getAll() : JSON.stringify({
      status: "Error",
      Msg: el.message
    });
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
      .then((res) => this.final(res.affectedTows !== 0))
      .catch((err) => console.log("err", err));
  }

  // 更新資料
  update(req) {
    const { id } = req.params;
    const { title } = req.body;

    return database
      .query(`UPDATE todos SET title='${title}' WHERE id='${id}'`)
      .then((res) => this.final(res.changedRows !== 0))
      .catch((err) => console.log("err", err));
  }

  // 刪除資料
  async delete(params) {
    const { id } = params;
    const data = await this.truncate(id);
    const box = data.map(item => `(NULL, '${item.title}')`);

    return database
      .query(`INSERT INTO todos VALUES ${box.join(",")}`)
      .then((res) => this.final(res.affectedTows !== 0))
      .catch((err) => console.log("err", err));
  }

  truncate(id) {
    const sql = `DELETE FROM todos WHERE id='${id}';SELECT * FROM todos;TRUNCATE TABLE todos;`;
    return database
      .query(sql)
      .then((res) => (res[0].affectedRows !== 0) ? res[1] : this.final(false))
      .catch((err) => console.log("err", err));
  }
}

module.exports = new ApiModel();
