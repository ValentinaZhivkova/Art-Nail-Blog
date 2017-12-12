import {NgModule} from '@angular/core';

import {authenticationComponents} from './index';

// Modules
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// Services
import {AuthenticationService} from './auth.service';
import {RegisterFormComponent} from './register-form/register-form.component';
import {LoginFormComponent} from './login-form/login-form.component';

@NgModule({
  declarations: [
    ...authenticationComponents,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ...authenticationComponents
  ],
  providers: [AuthenticationService]
})
export class AuthenticationModule {
}