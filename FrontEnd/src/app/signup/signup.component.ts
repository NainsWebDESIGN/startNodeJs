import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@service/login.service';
import { UserErr } from '@ts/enum';
import env from 'environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string = "";
  username: string = "";
  password: string = "";
  constructor(public islogin: LoginService, public router: Router) { }
  ngOnInit() {
  }
  signup() {
    if (this.email.search(env.emailRule) == -1) {
      alert(UserErr.EmailError);
      return;
    }

    if (this.username.trim() == "" || this.password.trim() == "" || this.email.trim() == "") {
      alert(UserErr.Blank);
      return;
    }

    let req = { data: { email: this.email, username: this.username, password: this.password } };
    this.islogin.signup(req);
  }

}
