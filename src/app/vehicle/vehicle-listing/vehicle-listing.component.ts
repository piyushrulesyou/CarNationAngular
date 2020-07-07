import { Component, OnInit } from '@angular/core';
import { VehicleResponse } from '../vehicle-models/VehicleModels';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-listing',
  templateUrl: './vehicle-listing.component.html',
  styleUrls: ['./vehicle-listing.component.css']
})

export class VehicleListingComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private cognitoUserService: CognitoUserService, private router: Router) { }

  isLoading: boolean = false;

  totalCars: number;
  vehicle: VehicleResponse;
  vehicleList: any[];
  basePriceArray: any[];
  discountedPriceArray: any[]
  initialCitySelected: string = 'Agra';

  ngOnInit(): void {

    this.vehicleService.initialCitySubject.subscribe(
      city => {
        this.initialCitySelected = city;
      }
    )

    if (!this.cognitoUserService.isLoggedIn()) {
      this.router.navigate(['/user/login']);
    }
    this.isLoading = true;
    this.vehicleService.getAllVehicles();
    this.vehicleService.vehicleInventory.subscribe(
      vehicles => {
        if (vehicles.data == null) {
          this.totalCars = 0;
        } else {
          this.vehicle = vehicles;
          this.vehicleList = this.vehicle.data.listVehicleDTO;
          this.totalCars = this.vehicleList.length;
          this.isLoading = false;
          this.basePriceArray = this.vehicleList;
        }
      }
    )
  }
}
