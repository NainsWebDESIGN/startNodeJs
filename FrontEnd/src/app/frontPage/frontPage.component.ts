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
  Add: string = "";
  changeNumber: number;
  Change: string = "";
  Delete: string = "";
  username: string = "";
  password: string = "";
  finalTodo = {
    next: res => this.todoList = res.data,
    error: err => console.log(err),
    complete: () => {
      ["Add", "Change", "Delete"].forEach(item => this[item] = "");
      this.changeNumber = undefined;
    }
  };
  ngOnInit() {
    this.postServer();
  }
  postServer(_name?: string) {

    let req;

    switch (_name) {
      case "post":
        req = { data: { title: this.Add } };
        break;
      case "put":
        req = { getway: this.changeNumber, data: { title: this.Change } };
        break;
      case "delete":
        req = { getway: this.Delete };
        break;
    }

    this.api.apiServer('/api/product', _name, req).subscribe(this.finalTodo);
  }
  login() {
    const username = this.username.trim(),
      password = this.password.trim();
    console.log(username, password);

  }
  changeSignupPage() {
    this.signUpPage.emit(true);
  }

}
