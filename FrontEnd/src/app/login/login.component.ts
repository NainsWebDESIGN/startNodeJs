import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() signUpPage = new EventEmitter();
  todoList = [];
  Add: string = "";
  changeNumber: number;
  Change: string = "";
  Delete: string = "";
  finalTodo = {
    next: res => {
      console.log(res);
      this.todoList = res;
    },
    error: error => console.error(error),
    complete: () => {
      ["Add", "Change", "Delete"].forEach((item: string) => this[item] = "");
      this.changeNumber = undefined;
    }
  }
  constructor(private api: ApiService) { }

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
}
