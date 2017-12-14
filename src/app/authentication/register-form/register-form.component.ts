import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {RegisterModel} from '../../authentication/models/register.model';
import {AuthenticationService} from '../../authentication/auth.service';
import {Route, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  public model: RegisterModel;
  public registeredUser: string;
  public registerSuccess: boolean;
  public registerFail: boolean;

  constructor(private authService: AuthenticationService, private router: Router,
              private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.model = new RegisterModel('', '', '', '', 'http://via.placeholder.com/350x200');
    this.toastr.setRootViewContainerRef(this.vcr);
  }

  register(): void {
    this.authService.register(this.model)
      .subscribe(
        data => {
          console.log(data);
          const username = this.model.username;
          const password = this.model.password;
          this.successfulRegister(data);

        },
        err => {
          this.registerFail = false;
          this.toastr.error(err.message);
        });
  }

  get diagnostics(): string {
    return JSON.stringify(this.model);
  }

  ngOnInit() {
  }

  successfulRegister(data): void {
    this.registerSuccess = true;
    this.registeredUser = data['username'];
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('userId', data['_id']);
    this.router.navigate(['']);
  }

  loginSuccessful(data): void {

  }

}
