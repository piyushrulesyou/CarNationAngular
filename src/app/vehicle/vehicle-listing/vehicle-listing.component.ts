import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleResponse } from '../vehicle-models/VehicleModels';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { PriceUtil } from '../../utils/PriceUtil';

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
  basePriceArray: any[];
  discountedPriceArray: any[]


  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.getAllVehicles().subscribe(
      response => {
        this.vehicle = response;
        this.vehicleList = this.vehicle.data;
        this.isLoading = false;
        this.totalCars = this.vehicleList.length;
        this.basePriceArray = PriceUtil.priceWithCommaArrayBasePrice(this.vehicleList);
      });
  }
}
