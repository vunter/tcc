import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlocosService {
  apiURL: string = environment.apiURL + "/bloco";

  constructor(
    private api: HttpClient
  ) { }
}
