import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserLoggedin() && req.url.indexOf('basicauth') === -1) {
      const request = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `${this.authService.getLoggedinUser()}`
        })
      });
      return next.handle(request);
    }

    return next.handle(req);
  }
}
