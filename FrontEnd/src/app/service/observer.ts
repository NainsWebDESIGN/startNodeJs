import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ObserverService {
    private Authorization: string = null;
    private subAuthorization = new BehaviorSubject(this.Authorization);
    obAuthorization = this.subAuthorization.asObservable();

    changeObserver(data) {
        this[data.item] = data.value;
        this[`sub${data.item}`].next(this[data.item]);
    }
}

