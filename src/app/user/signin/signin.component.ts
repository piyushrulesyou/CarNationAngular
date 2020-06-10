import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CognitoUserService } from '../cognito-user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  display: boolean = false;
  username: string;
  password: string;

  constructor(private cognitoUserService: CognitoUserService) { }

  ngOnInit(): void { }

  showDialog() {
    this.display = true;
  }

  onSubmit(signinForm: NgForm) {
    console.log(signinForm.value);

    this.cognitoUserService.signin(signinForm.value.username, signinForm.value.password).subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
