import { Component, OnInit } from '@angular/core';
import { LoginService } from '@service/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string = "";
  username: string = "";
  password: string = "";
  constructor(public islogin: LoginService) { }
  ngOnInit() {
  }
  signup() {
    let req = { data: { email: this.email, username: this.username, password: this.password } };
    this.islogin.signup(req);
  }

}
