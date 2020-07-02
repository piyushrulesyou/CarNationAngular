import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-transmission-filter',
  templateUrl: './transmission-filter.component.html',
  styleUrls: ['./transmission-filter.component.css']
})
export class TransmissionFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  transmissions: {
    transmissionCode: string,
    transmissionName: string
  }[] =
    [
      { transmissionCode: 'MAN', transmissionName: 'Manual' },
      { transmissionCode: 'AUTO', transmissionName: 'Automatic' }
    ]

  selectedTransmissions: string[] = [];
  ngOnInit(): void {
  }

  clearSelections() {
    this.selectedTransmissions = [];
    this.vehicleService.filterByTransmissionType(true, true);
  }

  onSelectTransmission() {
    const length = this.selectedTransmissions.length;
    if (length === 1) {
      if (this.selectedTransmissions.includes("MAN"))
        this.vehicleService.filterByTransmissionType(true, false);
      else
        this.vehicleService.filterByTransmissionType(false, true);
    } else {
      this.vehicleService.filterByTransmissionType(true, true);
    }
  }
}
