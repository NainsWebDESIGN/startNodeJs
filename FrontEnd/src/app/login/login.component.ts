import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

}
