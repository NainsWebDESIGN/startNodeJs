import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page: string = 'front';
  signupPage: boolean = false;
  constructor() { }
  ngOnInit() {
  }
}
