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

    getAulaIniciadaturma(idTurma: number): Observable<Aula> {
      return this.http.get<Aula>(this.apiURL + 'iniciada/turma/' + idTurma);
    }

    listByTurmaId(idTurma: number): Observable<Aula[]> {
      return this.http.get<Aula[]>(this.apiURL + 'turma/' + idTurma);
    }

    list5ByAlunoId(idAluno: number): Observable<Aula[]> {
      return this.http.get<Aula[]>(this.apiURL + 'aluno/' + idAluno);
    }

    save(aula: Aula): Observable<any> {
      return this.http.post<any>(this.apiURL + 'salvar', aula);
    }

    delete(aula: Aula): Observable<any> {
      return this.http.delete<any>(this.apiURL + 'delete/' + aula.id)
    }

    getProfessor(idAula: number): Observable<User> {
      return this.http.get<User>(this.apiURL + 'professor/' + idAula);
    }

    finalizarAula(aula: Aula): Observable<Aula> {
      return this.http.put<any>(this.apiURL + 'finalizar', aula);
    }

    iniciarAula(idAula: number): Observable<Aula> {
      return this.http.put<any>(this.apiURL + 'iniciar', idAula);
    }

    listIniciadasByAlunoId(idAluno: number): Observable<Aula[]> {
      return this.http.get<Aula[]>(this.apiURL + 'iniciada/aluno/' + idAluno);
    }
}
