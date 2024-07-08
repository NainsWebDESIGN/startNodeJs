import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { _location } from '@app/ts/Void';

import { Observable } from 'rxjs/Observable';

//RxJS
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class ApiService {
      Location: string;

      constructor(private http: HttpClient) {
            this.Location = window.location.href;
      }

      apiServer(getway: string, method: string = "get", body?: any) {
            let url = this.Location.includes("front-example.zeabur") ? `${_location}${getway}` : getway;

            switch (method) {
                  case "post":
                        return this.finalAPI(this.http.post(url, body.data));
                  case "put":
                        url = url + `/${body.getway}`;
                        return this.finalAPI(this.http.put(url, body.data));
                  case "delete":
                        url = url + `/${body.getway}`;
                        return this.finalAPI(this.http.delete(url));
                  default:
                        if (body) {
                              let options = {
                                    headers: new HttpHeaders().set("Authorization", body.Authorization)
                              }
                              return this.finalAPI(this.http.get(url, options));
                        } else {
                              return this.finalAPI(this.http.get(url));
                        }
            }

      }

      finalAPI(res: Observable<any>) {
            return res
                  .retry(2)
                  .map(this.checkAPI)
                  .catch(this.catchError)
                  .shareReplay();
      }

      checkAPI(res: any) {
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
            alert(err.message);
            console.log(err);
            return Observable.throw(err);
      }
}

