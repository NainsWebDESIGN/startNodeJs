import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/service/api.service';
import { UidService } from '@app/service/uid.service';

import 'rxjs/add/operator/shareReplay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() signUpPage = new EventEmitter();
  todoList;
  Add: string = "";
  changeNumber: number;
  Change: string = "";
  Delete: string = "";
  constructor(
    private api: ApiService,
    private uidStatus: UidService
  ) { }

  ngOnInit() {
    this.postServer();
  }

  postServer(_name: string = "get") {

    let req;

    switch (_name) {
      case "post":
        req = { data: { title: this.Add, uuid: this.uidStatus.uid } };
        break;
      case "put":
        req = { getway: this.changeNumber, data: { title: this.Change, uuid: this.uidStatus.uid } };
        break;
      case "delete":
        req = { getway: this.Delete, uuid: this.uidStatus.uid };
        break;
    }

    this.todoList = this.api.apiServer('/api/product', _name, req);
  }
}
