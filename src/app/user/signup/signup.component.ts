import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { NgForm } from '@angular/forms';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  displaySignup: boolean = false;
  displayOtp: boolean = false;
  username: string;
  email: string;
  password: string;
  signupResponse: string;
  otp: string;
  otpResponse: string;
  signinResponse: string;

  constructor(private cognitoUserService: CognitoUserService, private router: Router) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.displaySignup = true;
  }

  onSubmitSignup(signupForm: NgForm) {
    this.username = signupForm.value.username;
    this.password = signupForm.value.password;

    this.cognitoUserService.signup(signupForm.value.email, signupForm.value.username, signupForm.value.password).subscribe(
      data => {
        this.signupResponse = "Success";
        this.afterSignup();
      },
      err => {
        console.log("Registration error has occured");
        console.log(JSON.stringify(err));
      }
    )
  }
  afterSignup() {
    if (this.signupResponse === "Success") {
      this.displaySignup = false;
      this.displayOtp = true;
    } else {
      this.displaySignup = true;
      this.displayOtp = false;
    }
  }
  onSubmitOtp(otpForm: NgForm) {

    this.cognitoUserService.validateOTP(this.username, otpForm.value.otp).subscribe(
      data => {
        this.otpResponse = "Successfully registered and verified user!"
        this.displayOtp = false;
        this.afterOtp();
      },
      err => {
        console.log("User verification failed!!");
        console.log(JSON.stringify(err));
      }
    )
  }
  afterOtp() {
    //code to auto signin the user only after successful signup
    this.cognitoUserService.signin(this.username, this.password).subscribe();
  }
  resendOTP() {
    this.cognitoUserService.resendOTP(this.username);
  }
}
