import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import _url from '@app/ts/location';

import { Observable } from 'rxjs/Observable';

//RxJS
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/shareReplay';

export interface APIResponse {
      success: boolean
      data: any
      message: string
}

@Injectable()
export class ApiService {
      constructor(private http: HttpClient) { }
      apiServer(getway: string, method: string = "get", body?: any) {
            let url, options;

            if ((getway.includes("/api") && method !== "get") || getway.includes("logout")) {
                  options = { headers: new HttpHeaders({ "Authorization": body.data.uuid }) }
            }

            switch (method) {
                  case "post":
                        return this.finalAPI(this.http.post(_url + getway, body.data, options));
                  case "put":
                        url = `${_url + getway}/${body.getway}`;
                        return this.finalAPI(this.http.put(url, body.data, options));
                  case "delete":
                        url = `${_url + getway}/${body.getway}`;
                        return this.finalAPI(this.http.delete(url, options));
                  default:
                        return this.finalAPI(this.http.get(_url + getway));
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
            alert(err.error.data.message);
            console.log(err);
            return Observable.throw(err.error.data.message || err);
      }
}

