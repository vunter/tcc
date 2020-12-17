import { Observable } from 'rxjs';
import { Avaliacao } from './../entity/Avaliacao';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  apiURL: string = environment.apiURL + "/avaliacao/";

  constructor(
    private http: HttpClient
  ) { }


  save(avaliacao: Avaliacao): Observable<Avaliacao> {
    return this.http.post<Avaliacao>(this.apiURL + 'salvar', avaliacao);
  }
}
