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
}
