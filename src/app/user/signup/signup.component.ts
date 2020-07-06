import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false;
  isLoadingOTP: boolean = false;
  displayOtp: boolean = false;
  username: string;
  email: string;
  password: string;
  signupResponse: string;
  otp: string;
  otpResponse: string;
  otpError: string;
  registerError: string;

  constructor(private cognitoUserService: CognitoUserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitSignup(signupForm: NgForm) {
    this.isLoading = true;
    this.cognitoUserService.signup(this.email, this.username, this.password).subscribe(
      data => {
        this.signupResponse = "Success";
        this.afterSignup();
      },
      err => {
        console.log("Registration error has occured");
        console.log(JSON.stringify(err));
        this.isLoading = false;
        this.registerError = err.message;
        this.password = "";
      }
    )
  }
  afterSignup() {
    this.isLoading = false;
    if (this.signupResponse === "Success") {
      this.displayOtp = true;
    } else {
      this.displayOtp = false;
    }
  }
  onSubmitOtp(otpForm: NgForm) {
    this.isLoadingOTP = true;
    this.cognitoUserService.validateOTP(this.username, otpForm.value.otp).subscribe(
      data => {
        this.otpResponse = "Successfully registered and verified user!"
        this.displayOtp = false;
        this.afterOtp();
      },
      err => {
        this.otpError = "Wrong OTP, please try again!";
        console.log("User verification failed!!");
        console.log(JSON.stringify(err));
        this.otpError = err.message;
        this.isLoadingOTP = false;
      }
    )
  }
  afterOtp() {
    //code to auto signin the user only after successful signup
    this.isLoadingOTP = false;
    this.cognitoUserService.signin(this.username, this.password).subscribe();
    this.router.navigate(['/home']);
  }
  resendOTP() {
    this.otp = '';
    this.cognitoUserService.resendOTP(this.username).subscribe(
      data => {
        this.otpError = data;
      },
      err => {
        this.otpError = err;
      }
    );
  }
}
