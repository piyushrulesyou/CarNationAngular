import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-vehicles',
  templateUrl: './faq-vehicles.component.html',
  styleUrls: ['./faq-vehicles.component.css']
})
export class FaqVehiclesComponent implements OnInit {

  constructor() { }
  showFirst: boolean = false;
  showSecond: boolean = false;
  showThird: boolean = false;
  showFourth: boolean = false;


  ngOnInit(): void {
  }

  expandFirst() {
    this.showFirst = !this.showFirst;
    this.showSecond = false;
    this.showThird = false;
    this.showFourth = false;
  }
  expandSecond() {
    this.showFirst = false;
    this.showSecond = !this.showSecond;
    this.showThird = false;
    this.showFourth = false;
  }
  expandThird() {
    this.showFirst = false;
    this.showSecond = false;
    this.showThird = !this.showThird;
    this.showFourth = false;
  }
  expandFourth() {
    this.showFirst = false;
    this.showSecond = false;
    this.showThird = false;
    this.showFourth = !this.showFourth;
  }

}
