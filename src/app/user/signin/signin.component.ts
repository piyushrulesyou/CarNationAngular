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

  display: boolean = false;
  username: string;
  password: string;
  errMsg: string;

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

  showDialog() {
    this.display = true;
  }

  onSubmit(signinForm: NgForm) {
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
    if (loginRes.code === "INCORRECT_USERNAME_OR_PASSWORD") {
      this.errMsg = "Incorrect username or password.";
    } if (loginRes.code === "PASSWORD_CHANGE") {
      this.errMsg = "Please change your password before logging in.";
    } if (loginRes.code === "PASSWORD_RESET") {
      this.errMsg = "Please reset your password before logging in.";
    } if (loginRes.code === "VERIFY_OTP_FIRST") {
      this.errMsg = "Please verify your password before logging in.";
    }
    if (loginRes.code === "SUCCESS") {
      this.display = false;

      if (this.returnURL)
        this.router.navigateByUrl(this.returnURL);
      else
        this.router.navigate(['/home']);
    }
  }
}
