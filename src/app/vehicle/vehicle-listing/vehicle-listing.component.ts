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

  nextButton: string = '>';
  prevButton: string = '<';
  totalCars: number;
  vehicle: VehicleResponse;
  vehicleList: any[];
  basePriceArray: any[];
  discountedPriceArray: any[]
  initialCitySelected: string = 'Agra';
  totalPages: number;
  totalEnteries: number;
  pageNumber: number;
  paginationArray: number[] = [];
  newInventory: boolean = true;

  ngOnInit(): void {

    this.vehicleService.initialCitySubject.subscribe(
      city => {
        this.initialCitySelected = city;
      }
    )

    this.isLoading = true;
    this.initialVehicleListing();
    this.vehicleService.pageNumber.subscribe(
      currentPage => {
        this.pageNumber = currentPage;
      }
    )
    this.vehicleService.newInventoryLoaded.subscribe(
      isNewInventory => {
        this.newInventory = isNewInventory;
      }
    )
  }

  initialVehicleListing() {
    this.pageNumber = 0;
    this.vehicleService.pageNumber.next(0);
    this.vehicleService.filterVehicleListing(this.pageNumber);
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
    if (this.pageNumber != pageNumber) {
      this.pageNumber = pageNumber;
      this.vehicleService.filterVehicleListing(this.pageNumber);
      this.vehicleService.vehicleInventory.subscribe(
        vehicles => {
          if (vehicles.data == null) {
            this.totalCars = 0;
          } else {
            this.handleVehicleListing(vehicles);
          }
        })
    }
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
    if (this.newInventory === true) {
      this.paginationArray = [];
      for (let index = 0; index < this.totalPages; index++) {
        this.paginationArray.push(index + 1);
      }
    }
    this.newInventory = false;
  }
}
