import { Component, OnInit } from '@angular/core';
import { SigninComponent } from '../signin/signin.component';
import { NgForm } from '@angular/forms';
import { CognitoUserService } from '../cognito-user.service';
import { CognitoUser } from 'amazon-cognito-identity-js';

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

  constructor(private cognitoUserService: CognitoUserService) { }

  ngOnInit(): void {
  }

  showDialog() {
    this.displaySignup = true;
  }

  onSubmitSignup(signupForm: NgForm) {
    this.username = signupForm.value.username;

    this.cognitoUserService.signup(signupForm.value.email, signupForm.value.username, signupForm.value.password).subscribe(
      data => {
        this.signupResponse = "Success";
        console.log(this.signupResponse + "Enter OTP!");
        console.log(data);
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
        console.log("User verified successfully!!");
        console.log(data);
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
    //code to auto signin
    console.log(this.otpResponse);
  }
  resendOTP() {
    this.cognitoUserService.resendOTP(this.username);
  }
}
