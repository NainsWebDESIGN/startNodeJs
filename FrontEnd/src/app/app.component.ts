import { Component } from '@angular/core';
import { LoginService } from '@service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  page: string = 'front';
  constructor(private islogin: LoginService) { }
  ngOnInit() {
    this.islogin.page$.subscribe(page => this.page = page);
  }
}
