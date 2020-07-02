import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CognitoUserService } from '../cognito-service/cognito-user.service';

import { map, catchError, tap, finalize } from 'rxjs/operators'
import { Injectable } from '@angular/core';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  private static APP_AUTHORIZATION_HEADER: string = 'Authorization';
  private static APP_REQUEST_TIME_HEADER = 'x-request-time';
  private static APP_VERSION_HEADER = 'app-version';
  private static APP_VERSION_HEADER_VALUE = '1.0.0';
  private static APP_ID_HEADER = 'app-id';
  private static APP_ID_HEADER_VALUE = '1';

  constructor(private cognitoUserService: CognitoUserService) { }
  fullURL: string;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('http://') || req.url.startsWith('http://')) {
      return next.handle(req);
    } else {
      this.fullURL = `${environment.baseURL}${req.url}`;
    }
    let headerNew = req.headers;
    headerNew = headerNew.set(AppHttpInterceptor.APP_AUTHORIZATION_HEADER, this.cognitoUserService.getIdToken())
      .set(AppHttpInterceptor.APP_ID_HEADER, AppHttpInterceptor.APP_ID_HEADER_VALUE)
      .set(AppHttpInterceptor.APP_VERSION_HEADER, AppHttpInterceptor.APP_VERSION_HEADER_VALUE)
      .set(AppHttpInterceptor.APP_REQUEST_TIME_HEADER, new Date().toISOString());

    let new_req = req.clone({ headers: headerNew, url: this.fullURL });
    return next.handle(new_req).pipe(
      map(req => req),
      catchError(err => this.handleError(err)),
      // finalize(() => { this.loadingService.hide() })
    )
  }

  private handleError(err: HttpErrorResponse) {
    switch (err.status) {
      case 401:
        this.cognitoUserService.logout();
        break;
      default:
        console.log("Error occured inside interceptor: ", err);
        break;
    }
    return throwError(err);
  }
}