import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Output() signUpPage = new EventEmitter();
  email: string = "";
  username: string = "";
  password: string = "";
  constructor(private api: ApiService) { }
  ngOnInit() {
  }
  signup() {
    let req = { data: { email: this.email, username: this.username, password: this.password } };
    this.api.apiServer('/users/signup', 'post', req).subscribe(
      res => {
        ["email", "username", "password"].forEach(item => this[item] = "");
        this.signUpPage.emit('front');
      },
      err => console.log(err),
      () => {
        ["email", "username", "password"].forEach(item => this[item] = "");
      }
    );
  }

}
