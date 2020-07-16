import { Component, OnInit } from '@angular/core';
import { InitialCity } from '../utils/InitialCity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    InitialCity.updateInitialCity();
  }
}
