import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-segment-filter',
  templateUrl: './segment-filter.component.html',
  styleUrls: ['./segment-filter.component.css']
})
export class SegmentFilterComponent implements OnInit {

  constructor(public vehicleService: VehicleService) {
    this.vehicleService.resetAllFilter.subscribe(
      reset => {
        if (reset == true) {
          this.clearSelections();
        }
      }
    )
  }

  segments: {
    segmentCode: string,
    segmentName: string
  }[] = [
      { segmentCode: 'HatchBack', segmentName: 'HatchBack' },
      { segmentCode: 'Sedan', segmentName: 'Sedan' },
      { segmentCode: 'SUV', segmentName: 'SUV/MUV' }
    ];

  ngOnInit(): void { }

  clearSelections() {
    this.vehicleService.selectedSegments = [];
    this.vehicleService.filterBySegmentType(true, true, true);
  }

  onSelectSegment() {
    const length = this.vehicleService.selectedSegments.length;
    if (length === 1) {
      if (this.vehicleService.selectedSegments.includes("SUV"))
        this.vehicleService.filterBySegmentType(true, false, false);
      else if (this.vehicleService.selectedSegments.includes("Sedan"))
        this.vehicleService.filterBySegmentType(false, true, false);
      else
        this.vehicleService.filterBySegmentType(false, false, true);
    } else if (length === 2) {
      if (!this.vehicleService.selectedSegments.includes("SUV"))
        this.vehicleService.filterBySegmentType(false, true, true);
      else if (!this.vehicleService.selectedSegments.includes("Sedan"))
        this.vehicleService.filterBySegmentType(true, false, true);
      else
        this.vehicleService.filterBySegmentType(true, true, false);
    } else {
      this.vehicleService.filterBySegmentType(true, true, true);
    }
  }
}
