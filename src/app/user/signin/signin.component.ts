import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';
import { CognitoLoginResponse } from '../../core/models/AwsServiceModel';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username: string;
  password: string;
  isLoading: boolean = false;
  loginError: string;

  constructor(private cognitoUserService: CognitoUserService, private router: Router, private activateRoute: ActivatedRoute) { }
  returnURL: string;

  ngOnInit(): void {
    this.returnURL = this.activateRoute.snapshot.queryParams['returnURL'];
    this.activateRoute.queryParams.subscribe(
      (URL: Params) => {
        this.returnURL = URL['returnURL'];
      }
    )
  }

  onSubmit(signinForm: NgForm) {
    this.isLoading = true;
    this.cognitoUserService.signin(signinForm.value.username, signinForm.value.password).subscribe(
      data => {
        this.afterLogin(data);
      },
      err => {
        this.afterLogin(err);
      }
    )
  }

  afterLogin(loginRes: CognitoLoginResponse) {
    this.isLoading = false;
    if (loginRes.code === "SUCCESS") {
      if (this.returnURL)
        this.router.navigateByUrl(this.returnURL);
      else {
        this.router.navigate(['/home']);
      }
    } else {
      if (loginRes.code === "INCORRECT_USERNAME_OR_PASSWORD") {
        this.loginError = "Incorrect username or password.";
      } if (loginRes.code === "PASSWORD_CHANGE") {
        this.loginError = "Please change your password before logging in.";
      } if (loginRes.code === "PASSWORD_RESET") {
        this.loginError = "Please reset your password before logging in.";
      } if (loginRes.code === "VERIFY_OTP_FIRST") {
        this.loginError = "Please verify your password before logging in.";
      }
      this.password = "";
    }
  }
}
