import { Observable } from 'rxjs';
import { Resposta } from './../entity/Resposta';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {
  apiURL: string = environment.apiURL + "/resposta/";

  constructor(
    private http: HttpClient
  ) { }

    salvar(resposta: Resposta): Observable<any> {
      return this.http.post<any>(this.apiURL, resposta);
    }

    getAllByAula(idAula: number): Observable<Resposta[]> {
      return this.http.get<Resposta[]>(this.apiURL + 'list/aula/' + idAula);
    }

}
