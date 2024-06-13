import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private api: ApiService){}
  ngOnInit(){
    this.api.apiServer("get").subscribe(res => console.log(res));
    this.api.apiServer("post", {data: {title: "NainsTest"}}).subscribe(res => console.log(res));
    this.api.apiServer("delete", {getway: 1}).subscribe(res => console.log(res));
  }
}
