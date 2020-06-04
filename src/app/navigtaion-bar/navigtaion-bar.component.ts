import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigtaion-bar',
  templateUrl: './navigtaion-bar.component.html',
  styleUrls: ['./navigtaion-bar.component.css']
})
export class NavigtaionBarComponent implements OnInit {

  collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
