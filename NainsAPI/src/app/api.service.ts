import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//RxJS
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

      constructor(private http: HttpClient) { }

      apiServer(method: string, body?: any) {
            let url = `/api/product/`;

            switch (method) {
                  case "get":
                        return this.http.get(url)
                              .map((res: any) => this.checkAPI(res))
                              .catch(err => this.catchError(err));
                  case "post":
                        return this.http.post(url, body.data)
                              .map((res: any) => this.checkAPI(res))
                              .catch(err => this.catchError(err));
                  case "put":
                        url = url + body.getway;
                        return this.http.put(url, body.data)
                              .map((res: any) => this.checkAPI(res))
                              .catch(err => this.catchError(err));
                  case "delete":
                        url = url + body.getway;
                        return this.http.delete(url)
                              .map((res: any) => this.checkAPI(res))
                              .catch(err => this.catchError(err));
            }

      }

      checkAPI(res: any) {
            return (res.success) ? res.data : `Server Error`;
      }

      catchError(err) {
            return Observable.throw(err || 'Server error');
      }
}

