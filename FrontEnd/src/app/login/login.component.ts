import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/service/api.service';
import { UidService } from '@app/service/uid.service';

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
    private uidStatus: UidService
  ) { }

  ngOnInit() {
    this.api.apiServer("/users/profile", "get", { Authorization: this.uidStatus.Authorization })
      .subscribe(
        res => this.uidStatus.uid = res.status.cret,
        err => console.log(err)
      )
    this.postServer();
  }

  postServer(_name: string = "get") {

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
        if (res !== "Server Error") {
          this.todoList = res;
        }
        console.log(res);
      },
      error => console.log(error),
      () => {
        ["Add", "Change", "Delete"].forEach((item: string) => this[item] = "");
        this.changeNumber = undefined;
      }
    );
  }
}
