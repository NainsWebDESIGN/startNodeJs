import mysql from "../service/mysql.js";
export default class ApiModel {
  constructor() { }

  final = async (el) => {
    return el
      ? await this.GETALL()
      : JSON.stringify({
        status: "Error",
        Msg: el.message,
      });
  };

  //取得全部
  GETALL() {
    return mysql("SELECT * FROM todos")
      .then((res) => res)
      .catch((err) => console.log("err", err));
  }

  //新增資料
  CREATE(todo) {
    const { title } = todo;
    return mysql(`INSERT INTO todos VALUES(NULL, '${title}')`)
      .then((res) => this.final(res.affectedTows !== 0))
      .catch((err) => console.log("err", err));
  }

  // 更新資料
  UPDATE(req) {
    const { id } = req.params;
    const { title } = req.body;

    return mysql(`UPDATE todos SET title='${title}' WHERE id='${id}'`)
      .then((res) => this.final(res.changedRows !== 0))
      .catch((err) => console.log("err", err));
  }

  // 刪除資料
  async DELETE(params) {
    const { id } = params;
    const data = await this.truncate(id);
    const box = data.map((item) => `(NULL, '${item.title}')`);

    return mysql(`INSERT INTO todos VALUES ${box.join(",")}`)
      .then((res) => this.final(res.affectedTows !== 0))
      .catch((err) => console.log("err", err));
  }

  truncate(id) {
    const sql = `DELETE FROM todos WHERE id='${id}';SELECT * FROM todos;TRUNCATE TABLE todos;`;
    return mysql(sql)
      .then((res) => (res[0].affectedRows !== 0 ? res[1] : this.final(false)))
      .catch((err) => console.log("err", err));
  }
}
