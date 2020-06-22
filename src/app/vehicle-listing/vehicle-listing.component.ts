import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleService } from './vehicle-service/vehicle-service.service';
import { VehicleResponse } from './vehicle-models/VehicleModels';

@Component({
  selector: 'app-vehicle-listing',
  templateUrl: './vehicle-listing.component.html',
  styleUrls: ['./vehicle-listing.component.css']
})

export class VehicleListingComponent implements OnInit {

  isLoading: boolean = false;
  totalCars: number;
  vehicle: VehicleResponse;
  vehicleList: any[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.getAllVehicles().subscribe(
      response => {
        this.vehicle = response;
        this.vehicleList = this.vehicle.data;
        console.log(this.vehicle);
        this.isLoading = false;
        this.totalCars = this.vehicleList.length;
      });
  }
}
