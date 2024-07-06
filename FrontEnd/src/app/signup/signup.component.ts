import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Output() signUpPage = new EventEmitter();
  finalTodo = {
    next: res => console.log(res),
    error: err => console.log(err),
    complete: () => { }
  }
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.signup();
  }
  signup() {
    let req = { data: { email: 'test321@test.com', password: 'test321', username: 'testuser321' } };
    this.api.apiServer('/users/signup', 'post', req).subscribe(this.finalTodo);
  }
  changeSignupPage() {
    this.signUpPage.emit(false);
  }

}
