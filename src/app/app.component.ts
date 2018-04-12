import {Component, OnChanges, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from './authentication/auth.service';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'Art Nail Blog';
  username: string;

  constructor(private authService: AuthenticationService, private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

     this.authService.getUser(localStorage.getItem('username'))
      .subscribe(user => {
         // debugger

        this.username = user[0]['username'];
      });
  }

  ngOnChanges() {
   this.getCurrentUser();
  }
  getCurrentUser() {
    return this.username = localStorage.getItem('username');
  }
}
