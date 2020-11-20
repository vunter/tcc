import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  apiURL: string = environment.apiURL + "/turma";
  constructor(
    private api: HttpClient
  ) {  }

  getPublicacoes(idturma): Observable<any> {
    const params = new HttpParams()
      .set('idTurma', idturma);
    return this.api.get<any>(this.apiURL + '/list/publicacoes', { params });
  }

}
