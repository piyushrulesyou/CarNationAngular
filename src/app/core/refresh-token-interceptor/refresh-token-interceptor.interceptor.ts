import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoUserService } from '../cognito-service/cognito-user.service';
import { tap, switchMap } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private cognitoUserService: CognitoUserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.cognitoUserService.isTokenExpired()) {
      this.cognitoUserService.refreshToken().subscribe(() => {
        return next.handle(request);
      })
    } else {
      return next.handle(request);
    }
  }
}
