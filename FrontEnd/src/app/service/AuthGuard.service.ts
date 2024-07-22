// Angular
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Router } from '@angular/router';

import { UidService } from '@service/uid.service';

@Injectable()

/* 路由權限管理服務 */
export class AuthGuardService implements CanLoad, CanActivate {

    constructor(
        private router: Router,
        private uidStatus: UidService
    ) { }

    canLoad() {
        // console.log('canLoad');
        return this.checkLogin();
    }

    canActivate() {
        // console.log('canActivate');
        return this.checkLogin();
    }

    private checkLogin() {
        if (this.uidStatus.uid) {
            return true;
        }
        /**
      * 登出
      */
        this.uidStatus.clear();
        this.router.navigate(['/login']);
        return false;
    }
}