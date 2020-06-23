import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoUserService } from '../cognito-service/cognito-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private cognitoUserService: CognitoUserService, private router: Router) { }

  private UNAUTH_URL: string[] = ['/login', '/signup'];

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    var token = this.cognitoUserService.getIdToken();

    if (this.UNAUTH_URL.some(unauthUrl => state.url.includes(unauthUrl))) {
      if (token) {
        return this.router.createUrlTree(['/home']);
      } else {
        return true;
      }
    }
    else {
      if (token) {
        return true;
      }
      else {
        var returnURL = state.url;
        return this.router.createUrlTree(['/user/login'], { queryParams: { 'returnURL': returnURL } });
      }
    }
  }
}