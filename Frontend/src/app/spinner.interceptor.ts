import { ToastService } from './toast.service';
import { SpinnerOverlayService } from './shared/services/spinner-overlay.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private spinnerOverlayService: SpinnerOverlayService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   this.spinnerOverlayService.setLoading(true, request.url);
   return next.handle(request)
     .pipe(catchError((err) => {
       this.spinnerOverlayService.setLoading(false, request.url);
       return throwError(err);
     }))
     .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
       if (evt instanceof HttpResponse) {
         this.spinnerOverlayService.setLoading(false, request.url);
       }
       return evt;
     }));
  }
}
