import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AwsAuthData, CognitoLoginResponse, IAwsUserData } from '../models/AwsServiceModel';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CognitoUserService {

  public static REGION = environment.region;
  public static CLIENT_ID = environment.clientId;
  public static USER_POOL_ID = environment.userPoolId;
  public static USER_POOL = {
    UserPoolId: CognitoUserService.USER_POOL_ID,
    ClientId: CognitoUserService.CLIENT_ID
  }
  public static ACCESS_TOKEN_KEY = 'access_token';
  public static REFRESH_TOKEN_KEY = 'refresh_token';
  public static ID_TOKEN_KEY = 'id_token';
  public authData: AwsAuthData;
  public autoRefreshTokenTimer;

  constructor() { }

  getUserPool() {
    return new CognitoUserPool(CognitoUserService.USER_POOL);
  }

  getCurrentUser() {
    // uses the localstorage to fetch details of the current user and can only work after signin.
    return this.getUserPool().getCurrentUser();
  }

  getAccessToken() {
    return localStorage.getItem(CognitoUserService.ACCESS_TOKEN_KEY);
  }

  getIdToken() {
    return localStorage.getItem(CognitoUserService.ID_TOKEN_KEY);
  }

  getRefreshToken() {
    return localStorage.getItem(CognitoUserService.REFRESH_TOKEN_KEY);
  }

  isLoggedIn() {
    return this.getUserPool().getCurrentUser();
  }

  getSessionDetails() {
    const idToken = localStorage.getItem(CognitoUserService.ID_TOKEN_KEY);
    try {
      return JSON.parse(atob(idToken.split('.')[1]))
    } catch{
      return null;
    }

  }

  /**
   * Uses the ID token to get the user details stored in the payload part of the id token.
   */
  getUserDetails(): IAwsUserData {
    const id_token = this.getSessionDetails();
    if (id_token) {
      const user: IAwsUserData = {
        username: id_token['cognito:username'],
        email: id_token['email']
      }
      return user;
    }
    return null;
  }

  isTokenExpired() {
    const user = this.getSessionDetails();
    const expiryTime = user.exp;
    if (expiryTime < new Date().getTime() / 1000)
      return true;
    return false;
  }

  signup(email: string, username: string, password: string) {
    var dataEmail = {
      Name: 'email',
      Value: email
    }
    var attributeList = [];
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var userPool = this.getUserPool();
    attributeList.push(attributeEmail);

    return Observable.create(observer => {
      userPool.signUp(username, password, attributeList, null, function (err, res) {
        if (err) {
          observer.error(err);

        } else {
          observer.next(res);
        }
        observer.complete();
      })
    })
  }

  validateOTP(username: string, otp: string) {
    var userData = {
      Username: username,
      Pool: this.getUserPool()
    }
    var cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.confirmRegistration(otp, true, function (err, res) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(res);
        }
        observer.complete();
      })
    })
  }

  resendOTP(username: string) {
    const userData = {
      Username: username,
      Pool: this.getUserPool()
    }
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function (err, res) {
      if (err) {
        console.log("Resending OTP failed!! Try again");
      } else {
        console.log("OTP resent successfully to registered email address.");
      }
    })
  }

  signin(username: string, password: string) {
    this.authData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(this.authData);
    const userData = {
      Username: this.authData.Username,
      Pool: this.getUserPool()
    }
    const cognitoUser = new CognitoUser(userData);
    return new Observable<CognitoLoginResponse>(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (user: CognitoUserSession) => {
          this.handleLogin(user);
          observer.next({
            code: "SUCCESS",
            message: "User is successfully logged in",
            data: user
          });
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          observer.next({
            code: "PASSWORD_CHANGE",
            message: "Please change your password then login",
            data: null
          });
        },
        onFailure: (err) => {
          var code: string = "PLEASE_TRY_AGAIN"
          if (err.code === "UserNotFoundException" || err.code === "NotAuthorizedException") {
            code = "INCORRECT_USERNAME_OR_PASSWORD";
          } else if (err.code === "PasswordResetRequiredException") {
            code = "PASSWORD_RESET";
          } else if (err.code === "UserNotConfirmedException") {
            code = "VERIFY_OTP_FIRST";
          }
          observer.error({
            code: code,
            message: "Error occured during login",
            data: err.message
          });
        },
      })
    })
  }

  handleLogin(user: CognitoUserSession) {
    localStorage.setItem(CognitoUserService.ACCESS_TOKEN_KEY, user.getAccessToken().getJwtToken());
    localStorage.setItem(CognitoUserService.ID_TOKEN_KEY, user.getIdToken().getJwtToken());
    localStorage.setItem(CognitoUserService.REFRESH_TOKEN_KEY, user.getRefreshToken().getToken());
    this.autoRefreshToken(environment.tokenRefreshTime);
  }

  refreshToken(): Observable<void> {
    const refreshToken = this.getRefreshToken();
    const token = new CognitoRefreshToken({ RefreshToken: refreshToken });
    const userData = {
      Username: this.getUserDetails().username,
      Pool: this.getUserPool()
    }
    const cognitoUser = new CognitoUser(userData);
    new Observable(observer => {
      cognitoUser.refreshSession(token, (err, res) => {
        if (!err) {
          this.handleLogin(res);
        } else {
          console.log("Error occured inside refresh token service");
          this.logout();
        }
      })
    }).subscribe();
    return of(null).pipe(delay(4000));
  }

  logout() {
    var user = this.getCurrentUser();
    if (user)
      user.signOut();
    localStorage.clear();
    if (this.autoRefreshTokenTimer) {
      clearTimeout(this.autoRefreshTokenTimer);
    }
    this.autoRefreshTokenTimer = null;
  }

  autoRefreshToken(refreshTime: number) {
    this.autoRefreshTokenTimer = setTimeout(() => {
      this.refreshToken().subscribe();
    }, refreshTime * 1000)
  }

  forgotPassword() {

  }

  resetPassword() {

  }
}
