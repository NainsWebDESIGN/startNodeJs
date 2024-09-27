import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@service/login.service';
import { lineToken } from '@ts/lineOAuth';
import githubURL from '@ts/githubOAuth';
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
    // console.log(lineToken);
  }
  login() {
    const username = this.username.trim();
    const password = this.password.trim();
    const req = { data: { email: username, password: password } };

    this.islogin.login(req);
  }
  OAuthLogin(oAuth: string) {
    switch (oAuth) {
      case "github":
        location.href = githubURL;
        break;
      case "google":
        location.href = `${env.url}${env.googleOAuthURI}`;
        break;
      case "line":
        location.href = `${env.LINE_URL}${Object.keys(lineToken).map(item => `${item}=${lineToken[item]}`).join("&")}`;
        break;
    }
  }

}
