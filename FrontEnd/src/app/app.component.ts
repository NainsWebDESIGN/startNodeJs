import { Component, Inject } from '@angular/core';
import { Router } from '@angular/Router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(Router) private router: Router) { }
  ngOnInit() {
    if (window.location.href.includes('confrim')) {
      this.router.navigate(['/front/todos']);
    }
  }
}
