import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UidService } from '@service/uid.service';
import { APIResponse } from '@ts/interface';
import { Method } from '@ts/enum';
import env from '@ts/env';

import { Observable } from 'rxjs/Observable';

//RxJS
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class ApiService {
      constructor(
            private http: HttpClient,
            private uidStatus: UidService
      ) { }
      apiServer(getway: string, method: Method = Method.GET, body?: any) {
            let _url, options;

            if (!["/users/signup", "/users/login"].includes(getway)) {
                  options = {
                        headers: new HttpHeaders({ "Authorization": this.uidStatus.uid })
                  }
            }

            switch (method) {
                  case Method.POST:
                        return this.finalAPI(this.http.post(env.url + getway, body.data, options));
                  case Method.PUT:
                        _url = `${env.url + getway}/${body.getway}`;
                        return this.finalAPI(this.http.put(_url, body.data, options));
                  case Method.DELETE:
                        _url = `${env.url + getway}/${body.getway}`;
                        return this.finalAPI(this.http.delete(_url, options));
                  default:
                        return this.finalAPI(this.http.get(env.url + getway));
            }

      }

      finalAPI(res: Observable<any>) {
            return res
                  .retry(2)
                  .map(this.checkAPI)
                  .catch(this.catchError)
                  .shareReplay();
      }

      checkAPI(res: APIResponse) {
            switch (res.success) {
                  case true:
                        return res.data;
                  default:
                        console.log(res);
                        alert(res.message);
                        return `Server Error`;
            }
      }

      catchError(err) {
            alert(err.error.message);
            if (["未登入", "驗證失敗"].includes(err.error.message)) {
                  this.apiServer('/users/logout', Method.POST, { data: { uuid: this.uidStatus.uid } })
                        .subscribe(
                              res => {
                                    if (res.message === "OK") {
                                          location.href = "/";
                                          this.uidStatus.clear();
                                          sessionStorage.removeItem('uid');
                                    } else {
                                          alert(res.message);
                                    }
                              },
                              err => console.log(err),
                              () => {
                                    console.log(err);
                                    return Observable.throw(err.error.message || err);
                              }
                        );
            } else {
                  console.log(err);
                  return Observable.throw(err.error.message || err);
            }
      }
}

