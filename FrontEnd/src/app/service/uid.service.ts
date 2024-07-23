import { Injectable } from '@angular/core';

@Injectable()
export class UidService {
    //儲存目前uid的狀態
    private _uid: string;

    get uid(): string {
        this._uid = localStorage.getItem('uid');
        return this._uid;
    }

    set uid(uid: string) {
        if (uid) {
            localStorage.setItem('uid', uid);
        } else {
            localStorage.removeItem('uid');
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
