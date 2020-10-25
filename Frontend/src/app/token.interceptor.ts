import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = '/oauth';
    const usuarios = '/api/usuarios';
    if (request.url.search(auth) === -1 && request.url.search(usuarios) === -1) {
      const token = JSON.parse(localStorage.getItem('access_token'));

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token.access_token
          }
        })

      }
    }

    return next.handle(request);
  }
}
