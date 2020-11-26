import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Aula } from '../entity/Aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  apiURL: string = environment.apiURL + "/aula/";

  constructor(
    private http : HttpClient
    ) { }


    getAula(id: number): Observable<Aula> {
      return this.http.get<Aula>(this.apiURL + id);
    }

    listByTurmaId(idTurma: number): Observable<Aula[]> {
      return this.http.get<Aula[]>(this.apiURL + 'turma/' + idTurma);
    }

    save(aula: Aula): Observable<any> {
      return this.http.post<any>(this.apiURL + 'salvar', aula);
    }
}
