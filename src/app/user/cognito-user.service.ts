import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AwsAuthData, CognitoLoginResponse } from '../models/AwsServiceModel';

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

  constructor() { }

  getUserPool() {
    return new CognitoUserPool(CognitoUserService.USER_POOL);
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
          console.log("Signup failed!!!");
          observer.error(err);

        } else {
          console.log("User is registered!!");
          console.log(JSON.stringify(res));
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
          console.log("OTP Verification failed!!");
          observer.error(err);
        } else {
          console.log("OTP is verified!!");
          console.log(res);
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
  }

  logout() {

  }

  forgotPassword() {

  }

  resetPassword() {

  }
}
