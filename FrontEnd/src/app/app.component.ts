import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
    let path = (location.search).split("=");
    if (path[0] == "?success" && path[1] == "true") {
      this.router.navigate(['/success']);
    }
  }
  ngOnInit() {
    if (window.location.href.includes('confrim')) {
      this.router.navigate(['/front/todos']);
    }
  }
}
