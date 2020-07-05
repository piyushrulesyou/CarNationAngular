import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-no-vehicle-reset-filter',
  templateUrl: './no-vehicle-reset-filter.component.html',
  styleUrls: ['./no-vehicle-reset-filter.component.css']
})
export class NoVehicleResetFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
  }

  resetAll() {
    this.vehicleService.getAllVehicles();
  }

}
