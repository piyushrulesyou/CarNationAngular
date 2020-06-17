import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CognitoUserService } from '../cognito-service/cognito-user.service';

import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptorService implements HttpInterceptor {

  private static APP_AUTHORIZATION_HEADER: string = 'Authorization';
  private static APP_REQUEST_TIME_HEADER = 'x-request-time';
  private static APP_VERSION_HEADER = 'app-version';
  private static APP_VERSION_HEADER_VALUE = '1.0.0';
  private static APP_ID_HEADER = 'app-id';
  private static APP_ID_HEADER_VALUE = '1';

  next: HttpHandler;
  new_req: HttpRequest<any>;

  constructor(private cognitoUserService: CognitoUserService, private router: Router) { }
  fullURL: string;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('http://') || req.url.startsWith('http://')) {
      return next.handle(req);
    } else {
      // this.fullURL = environment.baseURL + req.url;
      this.fullURL = `${environment.baseURL}${req.url}`;
    }

    this.checkExpiredToken();

    console.log("44");
    console.log(this.cognitoUserService.getIdToken());


    let headerNew = req.headers;

    headerNew = headerNew.set(AppHttpInterceptorService.APP_AUTHORIZATION_HEADER, this.cognitoUserService.getIdToken())
      .set(AppHttpInterceptorService.APP_ID_HEADER, AppHttpInterceptorService.APP_ID_HEADER_VALUE)
      .set(AppHttpInterceptorService.APP_VERSION_HEADER, AppHttpInterceptorService.APP_VERSION_HEADER_VALUE)
      .set(AppHttpInterceptorService.APP_REQUEST_TIME_HEADER, new Date().toISOString());

    let new_req = req.clone({ headers: headerNew, url: this.fullURL });
    this.new_req = new_req;
    this.next = next;
    return next.handle(new_req).pipe(
      map(req => req),
      catchError(err => this.handleError(err))
    );
  }

  private checkExpiredToken() {
    console.log("11");
    if (this.cognitoUserService.isTokenExpired()) {
      console.log("22");
      this.cognitoUserService.refreshToken();
      console.log("33");
    }
  }

  private handleError(err: HttpErrorResponse) {

    switch (err.status) {
      case 401:
        this.cognitoUserService.logout();
        // this.router.navigate(['/home']);
        break;
      default:
        console.log("Error occured inside interceptor: ", err);
        // this.router.navigate(['/login']);
        break;
    }
    return throwError(err);
  }
}