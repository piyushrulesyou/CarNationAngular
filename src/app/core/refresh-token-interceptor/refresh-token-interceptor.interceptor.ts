import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoUserService } from '../cognito-service/cognito-user.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private cognitoUserService: CognitoUserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.cognitoUserService.isTokenExpired()) {
      return this.cognitoUserService.refreshToken().pipe(
        switchMap(() => {
          return next.handle(request);
        })
      )
    } else {
      return next.handle(request);
    }
  }
}
