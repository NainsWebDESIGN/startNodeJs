import { Injectable } from '@angular/core';

@Injectable()
export class UidService {
    //儲存目前uid的狀態
    private _uid: string;

    get uid(): string {
        this._uid = sessionStorage.getItem('uid');
        return this._uid;
    }

    set uid(uid: string) {
        if (uid) {
            sessionStorage.setItem('uid', uid);
        } else {
            sessionStorage.removeItem('uid');
        }

        this._uid = uid;
    }

    hasUid(): boolean {
        return !!!this._uid;
    }

    clear() {
        this.uid = null;
    }
}
