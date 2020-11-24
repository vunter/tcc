import { User } from './../entity/user';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenURL: string = environment.tokenURL;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  apiURL: string = environment.apiURL;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private api: HttpClient,
    private router: Router
  ) { }

  getToken() {
    let token = localStorage.getItem('access_token');
    if (token) {
      token = JSON.parse(token).access_token;
      return token;
    }
    return null;
  }


  attemptLogin(user: string, password: string): Observable<any> {

    const params = new HttpParams()
      .set('username', user)
      .set('password', password)
      .set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.api.post(this.tokenURL, params.toString(), { headers });
  }

  logout() {
    localStorage.removeItem('access_token');
    window.location.href = '';
  }

  getCurrentUser() {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token).user_name;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }

    return false;
  }

  register(user: User): Observable<User> {
    return this.api.post<User>(this.apiURL + '/public/salvar', user);
  }

  getRole(): String[] {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token).authorities;
    }
    return null;
  }

}
