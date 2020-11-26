import { Observable } from 'rxjs';
import { Publicacao } from './../entity/Publicacao';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  apiURL: string = environment.apiURL + "/publicacao/";

  constructor(
    private http: HttpClient
  ) { }


  save(pub: Publicacao): Observable<any> {
    return this.http.post(this.apiURL, pub);
  }
}
