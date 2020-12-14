import { Observable } from 'rxjs';
import { Publicacao } from './../entity/Publicacao';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  saveReply(pub: Publicacao, idPubPai): Observable<Publicacao> {
    const params = new HttpParams()
      .set('idPubPai', idPubPai);
    return this.http.put<Publicacao>(this.apiURL + 'save/reply', pub, { params });
  }
}
