import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@service/login.service';
import authURL from '@ts/githubOAuth';
import env from '@ts/env';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  env = env.testValue;
  constructor(
    public islogin: LoginService,
    public router: Router
  ) { }
  username: string = "";
  password: string = "";
  ngOnInit() {
  }
  login() {
    const username = this.username.trim(),
      password = this.password.trim();

    const req = { data: { email: username, password: password } };
    this.islogin.login(req);
  }

  githubLogin() {
    location.href = authURL;
  }

}
