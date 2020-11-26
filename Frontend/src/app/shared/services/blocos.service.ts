import { Bloco } from './../entity/Bloco';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlocosService {
  apiURL: string = environment.apiURL + "/bloco/";

  constructor(
    private api: HttpClient
  ) { }

  getBlocosByProfessor(idProfessor): Observable<Bloco[]> {
    return this.api.get<Bloco[]>(this.apiURL + 'list/professor/' + idProfessor);
  }

  save(bloco: Bloco): Observable<any> {
    return this.api.post<any>(this.apiURL + 'salvar', bloco);
  }
}
