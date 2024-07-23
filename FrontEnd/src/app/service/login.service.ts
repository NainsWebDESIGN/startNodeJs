import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@service/api.service';
import { UidService } from '@service/uid.service';
import { Method } from '@ts/enum';

@Injectable()
export class LoginService {
    constructor(private api: ApiService, private uuid: UidService, private router: Router) { }
    login(body: any) {
        this.api.apiServer('/users/login', Method.POST, body).subscribe(res => {
            if (res.message === "登入成功") {
                this.uuid.uid = res.status;
                // console.log(res.status);
                this.router.navigate(['/front/todos']);
            } else {
                alert(res.message);
            }
        })
    }
    signup(body: any) {
        this.api.apiServer('/users/signup', Method.POST, body).subscribe(res => {
            if (res.message === "註冊成功") {
                this.router.navigate(['/login']);
            } else {
                alert(res.message);
            }
        })
    }
    logout() {
        this.api.apiServer('/users/logout', Method.POST, this.uuid.uid).subscribe(res => {
            if (res.message === "OK") {
                location.href = "/";
                this.uuid.clear();
                sessionStorage.removeItem('uid');
            } else {
                alert(res.message);
            }
        })
    }
}
