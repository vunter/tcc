import { AuthService } from './auth.service';
import { User } from 'src/app/shared/entity/User';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiURL: string = environment.apiURL + "/usuario/";

  constructor(
    private api: HttpClient,
    private auth: AuthService
  ) { }


  salvar(user: User): Observable<any> {
    return this.api.post<any>(this.apiURL, user);
  }

  getLoggedUser(): Observable<User> {
    const params = new HttpParams()
      .set('username', this.auth.getCurrentUser());
    return this.api.get<User>(this.apiURL + 'user', {params});
  }

}
