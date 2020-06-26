import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-vs-buy',
  templateUrl: './sub-vs-buy.component.html',
  styleUrls: ['./sub-vs-buy.component.css']
})
export class SubVsBuyComponent implements OnInit {

  constructor() { }
  diffArray: string[] = [];
  lastDiff: number;
  isMore: boolean = true;

  ngOnInit(): void {
    this.prepareDiffArray();
  }

  prepareDiffArray() {
    this.diffArray.push('Zero Down Payment & Road Tax');
    this.diffArray.push('No Long Term Commitment');
    this.diffArray.push('No Loan Process, NO CIBIL CHECK');
    this.diffArray.push('Doorstep Pick & Drop for Maintenance & Service');
    this.lastDiff = this.diffArray.length - 1;
  }

  moreDiff() {
    this.isMore = false;
    this.diffArray.push('Stress-free Car Maintenance');
    this.diffArray.push('Option to switch cars');
    this.diffArray.push('Hassle Free Insurance claims');
    this.diffArray.push('Option to Buy-out the car');
    this.diffArray.push('Return or Extend Anytime');
    this.lastDiff = this.diffArray.length - 1;
  }
}
