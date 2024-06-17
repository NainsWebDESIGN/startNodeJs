class ApiModel {
  constructor() {
    this.todos = require("../public/json/data.json");
  }

  //取得全部
  getAll() {
    return this.todos;
  }

  //新增資料
  create(todo) {
    const { title } = todo;
    const newTodo = {
      title,
      id: this.todos.length == 0 ? 1 : this.todos[this.todos.length - 1].id + 1,
    };
    this.todos.push(newTodo);

    return newTodo;
  }

  // 更新資料
  update(req) {
    try {
      const { id } = req.params.id;
      const { body } = req.body;

      let _index = this.todos.findIndex((item) => item.id == id);

      this.todos[_index] = {
        id: id,
        ...body,
      };

      return "Success";
    } catch (e) {
      return e;
    }
  }

  // 刪除資料
  delete(params) {
    try {
      const { id } = params.id;

      this.todos.forEach((item, index) => {
        if (item.id == id) {
          this.todos.splice(index, 1);
        }
      });

      this.todos.forEach((item) => {
        if (item.id > id) {
          item.id--;
        }
      });

      return "Success";
    } catch (e) {
      return e;
    }
  }
}

module.exports = new ApiModel();
