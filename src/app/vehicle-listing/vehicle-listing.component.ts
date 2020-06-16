import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface VehicleResponse {
  error: any;
  errors: any;
  data: any[];
}

@Component({
  selector: 'app-vehicle-listing',
  templateUrl: './vehicle-listing.component.html',
  styleUrls: ['./vehicle-listing.component.css']
})

export class VehicleListingComponent implements OnInit {

  vehicle: VehicleResponse;
  vehicleList: any[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getInventory() {
    this.http.get<VehicleResponse>('vehicle-inventory/get-vehicle').subscribe(
      response => {
        this.vehicle = response;
        this.vehicleList = this.vehicle.data;
        console.log(this.vehicle);
      });
  }
}
