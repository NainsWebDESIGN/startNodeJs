import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommodityService {
    private merch = {};
    private merchSubject = new BehaviorSubject<any>(this.merch);
    merch$ = this.merchSubject.asObservable();
    constructor() { }
    changeMerch(merch: any) {
        this.merch = merch;
        this.merchSubject.next(this.merch);
    }
}
