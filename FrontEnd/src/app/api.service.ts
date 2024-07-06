import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _location } from '@app/ts/Void';

import { Observable } from 'rxjs/Observable';

//RxJS
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

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
                        return this.http.post(url, body.data)
                              .map(this.checkAPI)
                              .catch(this.catchError);
                  case "put":
                        url = url + `/${body.getway}`;
                        return this.http.put(url, body.data)
                              .map(this.checkAPI)
                              .catch(this.catchError);
                  case "delete":
                        url = url + `/${body.getway}`;
                        return this.http.delete(url)
                              .map(this.checkAPI)
                              .catch(this.catchError);
                  default:
                        return this.http.get(url)
                              .map(this.checkAPI)
                              .catch(this.catchError);
            }

      }

      checkAPI(res: any) {
            switch (res.success) {
                  case true:
                        return res.data;
                  default:
                        alert(res.message);
                        return `Server Error`;
            }
      }

      catchError(err) {
            alert(err.message);
            return Observable.throw(err);
      }
}

