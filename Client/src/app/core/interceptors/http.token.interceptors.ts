import { Injectable, Injector } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

import { JwtService } from 'src/app/core/services';
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers  = {
      'Accept' : 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token) {
      headers[`Authorization`] = 'Bearer ' + token;
    }

    const request = req.clone({ setHeaders: headers });
    return next.handle(request);
  }
}
