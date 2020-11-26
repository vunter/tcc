import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Turma } from '../entity/Turma';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  apiURL: string = environment.apiURL + "/public/";

  constructor(
    private http: HttpClient
  ) { }

  listPublicTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiURL + 'turmas');
  }
}
