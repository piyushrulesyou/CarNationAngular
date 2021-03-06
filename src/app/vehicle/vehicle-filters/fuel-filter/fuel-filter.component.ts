import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-fuel-filter',
  templateUrl: './fuel-filter.component.html',
  styleUrls: ['./fuel-filter.component.css']
})
export class FuelFilterComponent implements OnInit {

  constructor(public vehicleService: VehicleService) {
    this.vehicleService.resetAllFilter.subscribe(
      reset => {
        if (reset) {
          this.clearSelections();
        }
      }
    )
  }

  fuels: {
    fuelCode: string,
    fuelName: string
  }[] =
    [
      { fuelCode: 'PET', fuelName: 'Petrol' },
      { fuelCode: 'DIE', fuelName: 'Diesel' }
    ]

  ngOnInit(): void {
  }

  clearSelections() {
    this.vehicleService.selectedFuels = [];
    this.vehicleService.filterByFuelType(true, true);
  }

  onSelectFuel() {
    const length = this.vehicleService.selectedFuels.length;
    if (length === 1) {
      if (this.vehicleService.selectedFuels.includes("PET"))
        this.vehicleService.filterByFuelType(true, false);
      else
        this.vehicleService.filterByFuelType(false, true);
    } else {
      this.vehicleService.filterByFuelType(true, true);
    }
  }
}
