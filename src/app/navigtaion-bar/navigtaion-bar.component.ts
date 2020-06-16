import { Component, OnInit } from '@angular/core';
import { CognitoUserService } from '../core/cognito-service/cognito-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigtaion-bar',
  templateUrl: './navigtaion-bar.component.html',
  styleUrls: ['./navigtaion-bar.component.css']
})
export class NavigtaionBarComponent implements OnInit {

  collapsed: boolean = false;

  constructor(public cognitoUserService: CognitoUserService, private router: Router) { }

  ngOnInit(): void { }

  logout() {
    this.cognitoUserService.logout();
    this.router.navigate(['/home']);
  }

}
