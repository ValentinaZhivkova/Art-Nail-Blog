import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// Models
import {RegisterModel} from './models/register.model';
import {LoginModel} from './models/login.model';

const appKey = 'kid_HJ1c0Hd-f';
const appSecret = '7dd7a63d7b9f46b89e0bc22dea719afd';

const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const userUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;

@Injectable()
export class AuthenticationService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) {

  }

  login(loginModel: LoginModel) {
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    );
  }


  register(registerModel: RegisterModel): Observable<Object> {
    return this.http.post(
      registerUrl,
      JSON.stringify(registerModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    );
  }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    );
  }

  isLoggedIn() {
    const authtoken: string = localStorage.getItem('authtoken');

    return this.currentAuthtoken = authtoken;
  }
  isAdminRequest(userId) {
    return this.http.get(
      userUrl + '/' + userId,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    );
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      });
    } else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      });
    }
  }
}
