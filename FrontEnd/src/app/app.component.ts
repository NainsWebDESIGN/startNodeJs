import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UidService } from '@service/uid.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private uidStatus: UidService) {
    try {
      this.uidStatus.uid = localStorage.getItem("uid");
      console.log("uid: ", this.uidStatus.uid);
    } catch (e) {
      console.log("localStorage is not found uid: " + e);
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
