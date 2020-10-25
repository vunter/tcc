import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiURL: string = environment.apiURL + "/usuario";

  constructor(
    private api: HttpClient
  ) { }


  salvar(user: User): Observable<any> {
    return this.api.post<any>(this.apiURL, user);
  }

  getLoggedUser(user: string): Observable<User> {
    const params = new HttpParams()
      .set('username', user);
    return this.api.get<User>(this.apiURL + '/user', {params});
  }

}
