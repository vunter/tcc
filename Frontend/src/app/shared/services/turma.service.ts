import { User } from 'src/app/shared/entity/user';
import { Publicacao } from './../entity/Publicacao';
import { Global } from './../GlobalUse';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turma } from '../entity/Turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  apiURL: string = environment.apiURL + "/turma/";
  constructor(
    private api: HttpClient,
    private globals: Global
  ) { }

  getPublicacoes(idturma): Observable<Publicacao[]> {
    const params = new HttpParams()
      .set('idTurma', idturma);
    return this.api.get<Publicacao[]>(this.apiURL + 'list/publicacoes', { params });
  }

  entrarEmTurma(codigo: string, aluno: User): Observable<Turma> {
    const params = new HttpParams()
      .set('codTurma', codigo);
    return this.api.put<Turma>(this.apiURL + 'entrar', aluno, { params });
  }

  getTurmasUsuario(idUser): Observable<Turma[]> {
    if (this.globals.user.roles.includes('Aluno')) {
      return this.api.get<Turma[]>(this.apiURL + 'list/aluno/' + idUser);
    } else {
      return this.api.get<Turma[]>(this.apiURL + 'list/professor/' + idUser);
    }
  }

}
