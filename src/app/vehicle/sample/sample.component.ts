import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { ActivatedRoute } from '@angular/router';

interface VehicleResponse {
  error: any;
  errors: any;
  data: any[];
}

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  constructor() { }
  diffArray: string[] = [];
  lastDiff: number;

  ngOnInit(): void {
    this.prepareDiffArray();
  }

  prepareDiffArray() {
    this.diffArray.push('Zero Down Payment & Road Tax');
    this.diffArray.push('No Long Term Commitment');
    this.diffArray.push('No Loan Process, NO CIBIL CHECK');
    this.diffArray.push('Doorstep Pick & Drop for Maintenance & Service');
    this.diffArray.push('Stress-free Car Maintenance');
    this.diffArray.push('Option to switch cars');
    this.diffArray.push('Hassle Free Insurance claims');
    this.diffArray.push('Option to Buy-out the car');
    this.diffArray.push('Return or Extend Anytime');
    this.lastDiff = this.diffArray.length - 1;
  }
}
