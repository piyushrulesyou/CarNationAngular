import { Component, OnInit } from '@angular/core';
import { VehicleResponse } from '../vehicle-models/VehicleModels';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'

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
  totalPages: number;
  totalEnteries: number;
  carsPerPage: number = environment.carsPerPage;
  pageNumber: number = 0;
  paginationArray: number[] = [];
  initial: boolean = true;

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
    this.initialVehicleListing();
  }

  initialVehicleListing() {
    this.pageNumber = 0;
    this.vehicleService.getAllVehicles(this.pageNumber, this.carsPerPage);
    this.vehicleService.vehicleInventory.subscribe(
      vehicles => {
        if (vehicles.data == null) {
          this.totalCars = 0;
        } else {
          this.handleVehicleListing(vehicles);
        }
      }
    )
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.vehicleService.getAllVehicles(this.pageNumber, this.carsPerPage);
    this.vehicleService.vehicleInventory.subscribe(
      vehicles => {
        if (vehicles.data == null) {
          this.totalCars = 0;
        } else {
          this.handleVehicleListing(vehicles);
        }
      })
  }

  handleVehicleListing(vehicles: VehicleResponse) {
    this.vehicle = vehicles;
    this.vehicleList = this.vehicle.data.listVehicleDTO;
    this.totalCars = this.vehicle.data.totalEnteries;
    this.isLoading = false;
    this.basePriceArray = this.vehicleList;
    this.totalPages = this.vehicle.data.totalPages;
    this.totalEnteries = this.vehicle.data.totalEnteries;
    this.preparePaginationArray();
  }

  preparePaginationArray() {
    if (this.initial === true) {
      for (let index = 0; index < this.totalPages; index++) {
        this.paginationArray.push(index + 1);
      }
    }
    this.initial = false;
  }
}
