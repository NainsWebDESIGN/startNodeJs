import { Injectable } from '@angular/core';
import { ApiService } from '@service/api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {
    private page = 'front';
    private pageSubject = new BehaviorSubject<string>(this.page);
    page$ = this.pageSubject.asObservable();
    constructor(private api: ApiService) { }
    login(body: any) {
        this.api.apiServer('/users/login', "post", body).subscribe(res => {
            if (res.message === "登入成功") {
                this.changePage('login');
            } else {
                alert(res.message);
            }
        })
    }
    signup(body: any) {
        this.api.apiServer('/users/signup', 'post', body).subscribe(res => {
            if (res.message === "註冊成功") {
                this.changePage('front');
            } else {
                alert(res.message);
            }
        })
    }
    changePage(page) {
        this.page = page;
        this.pageSubject.next(this.page);
    }
}
