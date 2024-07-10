import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/service/api.service';
import { UidService } from '@app/service/uid.service';

@Component({
  selector: 'app-frontPage',
  templateUrl: './frontPage.component.html',
  styleUrls: ['./frontPage.component.scss']
})
export class FrontPageComponent implements OnInit {
  constructor(
    private api: ApiService,
    private uidStatus: UidService
  ) { }
  @Output() signUpPage = new EventEmitter();
  username: string = "";
  password: string = "";
  todoList = [];
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
        res => this.uidStatus.Authorization = res.status,
        err => console.log(err),
        () => this.signUpPage.emit('login')
      );
  }

}
