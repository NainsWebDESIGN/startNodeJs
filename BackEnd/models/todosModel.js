const uuid = require("uuid").v4;

class TodoModel {
  constructor() {
    this.todos = [
      {
        title: "TEST",
        id: uuid(),
      },
    ];
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
      id: uuid(),
    };
    this.todos.push(newTodo);

    return newTodo;
  }
}

module.exports = new TodoModel();
