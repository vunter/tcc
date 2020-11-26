import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  apiURL: string = environment.apiURL + "/professor";

  constructor(
    private http: HttpClient
  ) { }
}
