import { Global } from '../GlobalUse';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiURL: string = environment.apiURL + "/usuario/";

  constructor(
    private api: HttpClient,
    private auth: AuthService,
    private globals: Global
  ) { }


  salvar(user: User): Observable<any> {
    return this.api.post<any>(this.apiURL, user);
  }

  getLoggedUser(): Observable<User> {
    const params = new HttpParams()
      .set('username', this.auth.getCurrentUser());
    return this.api.get<User>(this.apiURL + 'user', { params });
  }

  configGlobal(): Promise<any> {
    if (this.auth.isAuthenticated()) {
      return this.getLoggedUser().toPromise().then((response) => {
        this.globals.user = response;
      }).catch(() => this.globals.user = new User())
    }
  }
}
