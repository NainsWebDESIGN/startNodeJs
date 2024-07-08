import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-frontPage',
  templateUrl: './frontPage.component.html',
  styleUrls: ['./frontPage.component.scss']
})
export class FrontPageComponent implements OnInit {
  constructor(private api: ApiService) { }
  @Output() signUpPage = new EventEmitter();
  todoList = [];
  username: string = "";
  password: string = "";
  Authorization: string = "";
  finalTodo = {
    next: res => this.todoList = res,
    error: err => console.log(err)
  };
  ngOnInit() {
    this.api.apiServer('/api/product').subscribe(
      res => this.todoList = res,
      err => console.log(err)
    );
  }
  login() {
    const username = this.username.trim(),
      password = this.password.trim();

    const req = { data: { email: username, password: password } };
    this.api.apiServer('/users/login', "post", req)
      .subscribe(
        res => {
          console.log(res);
          this.Authorization = res.status;
        },
        err => console.log("123456", err),
        () => {
          let re = { Authorization: this.Authorization };
          this.api.apiServer("/users/profile", "get", re)
            .subscribe(
              res => console.log(res),
              err => console.log(err)
            )
          this.signUpPage.emit('login');
        }
      );
  }
  changeSignupPage() {
    this.signUpPage.emit('signup');
  }

}
