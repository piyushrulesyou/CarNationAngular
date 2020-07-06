import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-fuel-filter',
  templateUrl: './fuel-filter.component.html',
  styleUrls: ['./fuel-filter.component.css']
})
export class FuelFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService) {
    this.vehicleService.resetAllFilter.subscribe(
      reset => {
        if (reset == true) {
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

  selectedFuels: string[] = [];
  ngOnInit(): void {
  }

  clearSelections() {
    this.selectedFuels = [];
    this.vehicleService.filterByFuelType(true, true);
  }

  onSelectFuel() {
    const length = this.selectedFuels.length;
    if (length === 1) {
      if (this.selectedFuels.includes("PET"))
        this.vehicleService.filterByFuelType(true, false);
      else
        this.vehicleService.filterByFuelType(false, true);
    } else {
      this.vehicleService.filterByFuelType(true, true);
    }
  }
}
