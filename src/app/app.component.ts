import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Art Nail Blog';
  constructor(private authService: AuthenticationService) {

  }
}
