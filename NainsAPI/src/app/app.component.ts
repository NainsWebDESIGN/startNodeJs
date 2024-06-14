import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoList = [];
  Add: string = "";
  Change: string = "";
  Delete: string = "";
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.apiServer("get").subscribe(res => this.todoList = res);
    // this.api.apiServer("post", { data: { title: "NainsTest" } }).subscribe(res => console.log(res));
    // this.api.apiServer("delete", { getway: 1718328597083 }).subscribe(res => console.log(res));
  }
  postServer(_name: string) {
    switch (_name) {
      case "Add":
        this.api.apiServer("post").subscribe(res => this.todoList = res);
        break;
      case "Change":
        this.api.apiServer("put").subscribe(res => this.todoList = res);
        break;
      case "Delete":
        this.api.apiServer("delete").subscribe(res => this.todoList = res);
        break;
    }
  }
}
