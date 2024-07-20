import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@service/api.service';
import { UidService } from '@service/uid.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {
    constructor(private api: ApiService, private uuid: UidService, private router: Router) { }
    login(body: any) {
        this.api.apiServer('/users/login', "post", body).subscribe(res => {
            console.log(res);
            if (res.message === "登入成功") {
                this.uuid.uid = res.status;
                this.router.navigate(['/front/todos']);
            } else {
                alert(res.message);
            }
        })
    }
    signup(body: any) {
        this.api.apiServer('/users/signup', 'post', body).subscribe(res => {
            if (res.message === "註冊成功") {
                this.router.navigate(['/login']);
            } else {
                alert(res.message);
            }
        })
    }
    logout(body) {
        this.api.apiServer('/users/logout', 'post', body).subscribe(res => {
            if (res.message === "OK") {
                this.uuid.clear();
                this.router.navigate(['/login']);
            } else {
                alert(res.message);
            }
        })
    }
}
