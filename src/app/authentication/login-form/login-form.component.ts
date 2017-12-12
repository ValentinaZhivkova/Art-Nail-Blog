import {Component, OnInit} from '@angular/core';
import {LoginModel} from '../models/login.model';
import {AuthenticationService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public model: LoginModel;
  public loginFail: boolean;
  public username: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.model = new LoginModel('', '');
    this.username = '';
  }

  login(): void {
    this.authService.login(this.model)
      .subscribe(data => {
          console.log(data);
        this.loginSuccessful(data);
      },
        err => {
        this.loginFail = true;
        });
  }

  loginSuccessful(data): void {
  this.authService.authtoken = data['_kmd']['authtoken'];
  localStorage.setItem('authtoken', data['_kmd']['authtoken']);
  localStorage.setItem('username', data['username']);
  localStorage.setItem('userId', data['_id']);
  this.loginFail = false;
  this.router.navigate(['']);
  }
  ngOnInit() {
  }

}
