import { Component } from '@angular/core';
import { Router } from '@angular/Router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  ngOnInit() {
    if (window.location.href.includes('confrim')) {
      this.router.navigate(['/front/todos']);
    }
  }
}
