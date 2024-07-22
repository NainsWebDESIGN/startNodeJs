import { Injectable } from '@angular/core';
import { ApiService } from '@service/api.service';
import { Method } from '@ts/enum';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TodosService {
    private todos = [];
    private todosSubject = new BehaviorSubject<any>(this.todos);
    todos$ = this.todosSubject.asObservable();
    constructor(private api: ApiService) { }
    updateTodos(todo) {
        this.todos = todo;
        this.todosSubject.next(this.todos);
    }
    getTodos(getway: string, method: Method = Method.GET, body?: any) {
        this.api.apiServer(getway, method, body).subscribe(res => {
            this.todos = res;
            this.todosSubject.next(this.todos);
        });
    }
}
