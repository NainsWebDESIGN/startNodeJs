import { Component, OnInit } from '@angular/core';
import { TodosService } from '@service/todos.service';
import { LoginService } from '@service/login.service';

@Component({
  selector: 'app-frontPage',
  templateUrl: './frontPage.component.html',
  styleUrls: ['./frontPage.component.scss']
})
export class FrontPageComponent implements OnInit {
  constructor(
    private todos: TodosService,
    public islogin: LoginService
  ) { }
  username: string = "";
  password: string = "";
  todoList;
  ngOnInit() {
    this.todos.getTodos('/api/product');
    this.todoList = this.todos.todos$;
  }
  login() {
    const username = this.username.trim(),
      password = this.password.trim();

    const req = { data: { email: username, password: password } };
    this.islogin.login(req);
  }

}
