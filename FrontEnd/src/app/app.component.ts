import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UidService } from '@service/uid.service';
import { ApiService } from '@service/api.service';
import { LoginService } from '@service/login.service';
import { LineOAuthService } from '@service/lineOAuth.service';
import { Method } from './ts/enum';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private uidStatus: UidService,
    private api: ApiService,
    private islogin: LoginService,
    private isline: LineOAuthService
  ) {
    try {
      this.uidStatus.uid = localStorage.getItem("uid");
      // console.log("uid: ", this.uidStatus.uid);
    } catch (e) {
      console.log("localStorage is not found uid: " + e);
    }

    if (location.search.includes('OAuthToken')) {
      const OAuthToken = location.search.split("&")[0].split("=")[1];
      const OAuthfrom = location.search.split("&")[1].split("=")[1];
      this.uidStatus.uid = OAuthToken;

      this.api.apiServer(`/${OAuthfrom}/user`)
        .map(res => res.user)
        .subscribe(
          res => this.islogin.login({ data: { email: res.email, password: res.password } }),
          err => console.log(err)
        )
    }

    if (location.search.includes("?code=")) {
      this.isline.LineLogin()
        .subscribe(
          res => this.uidStatus.uid = res.id_token,
          err => console.log(err),
          () => {
            this.api.apiServer(`/lineOAuth`, Method.POST, { data: {} })
              .map(response => (response.status) ? response.user : false)
              .subscribe(
                _res => {
                  if (_res) {
                    this.islogin.login({ data: { email: _res.email, password: _res.password } })
                  }
                },
                err => console.log(err)
              )
          }
        );
    }

    if (location.search.includes('success=true')) {
      this.router.navigate(['/success']);
    }

    if (window.location.href.includes('/confrim')) {
      this.router.navigate(['/front/todos']);
    }

  }
  ngOnInit() {
  }
}
