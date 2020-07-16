import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.css']
})
export class BrandFilterComponent implements OnInit {

  constructor(public vehicleService: VehicleService) {
    this.vehicleService.resetAllFilter.subscribe(
      reset => {
        if (reset == true) {
          this.clearSelections();
        }
      }
    )
  }
  brandList: any[];

  ngOnInit(): void {
    this.vehicleService.getAllBrands().subscribe(
      brandList => {
        this.brandList = brandList.data.producers;
      }
    )
  }

  clearSelections() {
    this.vehicleService.selectedBrands = [];
    this.onSelectBrand();
  }

  onSelectBrand() {
    this.vehicleService.filterByBrandName(this.vehicleService.selectedBrands);
  }
}
