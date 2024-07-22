import { Component, OnInit } from '@angular/core';
import { TodosService } from '@service/todos.service';

@Component({
  selector: 'app-frontPage',
  templateUrl: './frontPage.component.html',
  styleUrls: ['./frontPage.component.scss']
})
export class FrontPageComponent implements OnInit {
  constructor(public todoList: TodosService) { }
  ngOnInit() {
    this.todoList.getTodos("/api/product");
  }
}
