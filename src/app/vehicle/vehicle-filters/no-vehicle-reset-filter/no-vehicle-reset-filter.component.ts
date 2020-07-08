import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';
import { VehicleListingComponent } from '../../vehicle-listing/vehicle-listing.component';

@Component({
  selector: 'app-no-vehicle-reset-filter',
  templateUrl: './no-vehicle-reset-filter.component.html',
  styleUrls: ['./no-vehicle-reset-filter.component.css']
})
export class NoVehicleResetFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService,
    private vehicleListingComponent: VehicleListingComponent) { }

  ngOnInit(): void {
  }

  resetAll() {
    this.vehicleListingComponent.initialVehicleListing();
    this.vehicleService.resetAllFilter.next(true);
  }
}
