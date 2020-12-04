import { Aula } from './../entity/Aula';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  apiURL: string = environment.apiURL + "/aula/";

  constructor(
    private http : HttpClient
    ) { }


    getAula(id: number): Observable<Aula> {
      return this.http.get<any>(this.apiURL + id);
    }

    listByTurmaId(idTurma: number): Observable<Aula[]> {
      return this.http.get<Aula[]>(this.apiURL + 'turma/' + idTurma);
    }

    save(aula: Aula): Observable<any> {
      return this.http.post<any>(this.apiURL + 'salvar', aula);
    }

    getProfessor(idAula: number): Observable<User> {
      return this.http.get<User>(this.apiURL + 'professor/' + idAula);
    }
}
