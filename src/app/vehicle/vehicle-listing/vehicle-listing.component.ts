import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleResponse } from '../vehicle-models/VehicleModels';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { PriceUtil } from '../../utils/PriceUtil';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/loading-service/loading-service.service';

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

  ngOnInit(): void {

    if (!this.cognitoUserService.isLoggedIn()) {
      this.router.navigate(['/user/login']);
    }
    this.isLoading = true;
    this.vehicleService.getAllVehicles();
    this.vehicleService.vehicleInventory.subscribe(
      vehicles => {
        if (vehicles.data.totalEnteries === 0) {
          console.log("No inventory found for the current filters.");
        }
        this.vehicle = vehicles;
        this.vehicleList = this.vehicle.data.listVehicleDTO;
        this.totalCars = this.vehicle.data.totalEnteries;
        this.isLoading = false;
        this.basePriceArray = PriceUtil.priceWithCommaArrayBasePrice(this.vehicleList);
      }
    )
  }
}
