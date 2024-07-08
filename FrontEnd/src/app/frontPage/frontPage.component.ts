import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/service/api.service';
import { ObserverService } from '@app/service/observer';

@Component({
  selector: 'app-frontPage',
  templateUrl: './frontPage.component.html',
  styleUrls: ['./frontPage.component.scss']
})
export class FrontPageComponent implements OnInit {
  constructor(
    private api: ApiService,
    private share: ObserverService
  ) { }
  @Output() signUpPage = new EventEmitter();
  todoList = [];
  username: string = "";
  password: string = "";
  finalTodo = {
    next: res => this.todoList = res,
    error: err => console.log(err)
  };
  ngOnInit() {
    this.share.obAuthorization.subscribe(value => {
      if (value !== null) {
        this.api.apiServer("/users/profile", "get", { Authorization: value })
          .subscribe(
            res => console.log(res),
            err => console.log(err),
            () => this.signUpPage.emit('login')
          )
      }
    });
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
          if (res !== null) {
            this.share.changeObserver({ item: 'Authorization', value: res.status });
          }
        },
        err => console.log(err)
      );
  }
  changeSignupPage() {
    this.signUpPage.emit('signup');
  }

}
