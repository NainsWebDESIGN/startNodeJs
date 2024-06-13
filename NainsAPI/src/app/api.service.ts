import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//RxJS
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

      constructor(private http: HttpClient) { }

      apiServer(method: string, body?: any) {
            let url = `/api/product/`;

            switch(method){
                  case "get":
                        return this.http.get(url).map((res: any) => this.checkAPI(res));
                        case "post":
                              return this.http.post(url, body.data).map((res: any) => this.checkAPI(res));
                              case "delete":
                                    url = url + body.getway;
                                    return this.http.delete(url).map((res: any) => this.checkAPI(res));
            }

      }

      checkAPI(res: any){
            return (res.success) ? res.data : `Server Error`;
      }
}

