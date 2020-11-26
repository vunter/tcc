import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/entity/user';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  apiURL: string = environment.apiURL + "/aluno/";

  constructor(
    private http: HttpClient
  ) { }

  save(user: User): Observable<any> {
    return this.http.post<any>(this.apiURL + 'salvar', user);
  }

  edit(user: User): Observable<any> {
    return this.http.post<any>(this.apiURL + 'edit', user);
  }

  getAluno(id: number): Observable<User> {
    return this.http.get<User>(this.apiURL + id);
  }

  listByTurma(turmaId: number): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL + 'list/turma/' + turmaId);
  }
}
