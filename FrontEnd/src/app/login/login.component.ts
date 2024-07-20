import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { TodosService } from '@service/todos.service';
import { LoginService } from '@service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    // private todos: TodosService,
    public islogin: LoginService,
    public router: Router
  ) { }
  username: string = "";
  password: string = "";
  // todoList;
  ngOnInit() {
    // this.todos.getTodos('/api/product');
    // this.todoList = this.todos.todos$;
  }
  login() {
    const username = this.username.trim(),
      password = this.password.trim();

    const req = { data: { email: username, password: password } };
    this.islogin.login(req);
  }

}
