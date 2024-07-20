import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@service/login.service';
import emailRule from '@ts/email';

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
    if (this.email.search(emailRule) == -1) {
      alert("請輸入正確的信箱格式");
      return;
    } else if (this.username.trim() == "" || this.password.trim() == "" || this.email.trim() == "") {
      alert("請填寫所有欄位");
      return;
    }

    let req = { data: { email: this.email, username: this.username, password: this.password } };
    this.islogin.signup(req);
  }

}
