import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private api: ApiService) { }
  todoList = [];
  Add: string = "";
  changeNumber: number;
  Change: string = "";
  Delete: string = "";
  finalTodo = {
    next: res => this.todoList = res,
    error: err => console.log(err),
    complete: () => {
      ["Add", "Change", "Delete"].forEach(item => this[item] = "");
      this.changeNumber = undefined;
    }
  }
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

    this.api.apiServer(_name, req).subscribe(this.finalTodo);
  }
}
