import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from '../auth.service';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthenticationService,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.authService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.showInfo();
      });
  }

  showInfo() {
    this.toastr.info('Loging out!');
  }
}
