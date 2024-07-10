import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/service/api.service';
import { ObserverService } from '@app/service/observer';

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
  constructor(
    private api: ApiService,
    private share: ObserverService
  ) { }

  ngOnInit() {
    this.share.obAuthorization.subscribe(value => {
      this.api.apiServer("/users/profile", "get", { Authorization: value })
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
    });
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

    this.api.apiServer('/api/product', _name, req).subscribe(
      res => {
        console.log(res);
        // this.todoList = res;
      },
      error => console.error(error),
      () => {
        ["Add", "Change", "Delete"].forEach((item: string) => this[item] = "");
        this.changeNumber = undefined;
      }
    );
  }
}
