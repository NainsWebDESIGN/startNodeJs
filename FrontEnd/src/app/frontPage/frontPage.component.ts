import { Component, OnInit } from '@angular/core';
import { TodosService } from '@service/todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-frontPage',
  templateUrl: './frontPage.component.html',
  styleUrls: ['./frontPage.component.scss']
})
export class FrontPageComponent implements OnInit {
  // todoList: Observable<any>;
  constructor(public todoList: TodosService) { }
  ngOnInit() {
    this.todoList.getTodos("/api/product");
    // this.todoList = this.todos.todos$;
  }
}
