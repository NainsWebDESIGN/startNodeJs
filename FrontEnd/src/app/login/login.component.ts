import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UidService } from '@service/uid.service';
import { TodosService } from '@service/todos.service';
import { LoginService } from '@service/login.service';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/shareReplay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  todoList: Observable<any>;
  Add: string = "";
  changeNumber: number = 1;
  Change: string = "";
  Delete: string = "";
  constructor(
    private uidStatus: UidService,
    private todos: TodosService,
    public islogin: LoginService
  ) { }

  ngOnInit() {
    this.postServer();
    this.todoList = this.todos.todos$;
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
        req = { getway: this.Delete, data: { uuid: this.uidStatus.uid } };
        break;
    }

    this.todos.getTodos('/api/product', _name, req);
    ["Add", "Change", "Delete"].forEach(item => this[item] = "");
    this.changeNumber = 1;
  }
}
