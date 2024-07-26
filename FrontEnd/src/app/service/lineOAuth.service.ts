import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { UidService } from '@service/uid.service';
import { postLine } from '@ts/lineOAuth';
import { LineResponse } from '@ts/interface';
import env from '@ts/env';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class LineOAuthService {

    constructor(private http: HttpClient, private uidStatus: UidService) { }
    LineLogin() {
        const header = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
        postLine.code = location.search.split("&")[0].split("=")[1];
        let data = new URLSearchParams();

        Object.keys(postLine).forEach(item => data.set(item, postLine[item]));
        // console.log(postLine);

        return this.http.post(env.LINE_API, data.toString(), header)
            .map(
                (data: HttpResponse<LineResponse>) => data,
                (err: HttpErrorResponse) => Observable.throw(err)
            )
            .catch((err: HttpErrorResponse) => {
                alert(err.error.message || err.message);
                if (["未登入", "驗證失敗"].includes(err.error.message)) {
                    location.href = "/";
                    this.uidStatus.clear();
                    sessionStorage.removeItem('uid');
                }
                console.log(err);
                return Observable.throw(err.error.message || err);
            })
            .shareReplay();
    }
}
