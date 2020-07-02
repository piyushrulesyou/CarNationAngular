import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.css']
})
export class BrandFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }
  brandList: any[];
  selectedBrands: string[] = [];

  ngOnInit(): void {
    this.vehicleService.getAllBrands().subscribe(
      brandList => {
        this.brandList = brandList.data.producers;
      }
    )
  }

  clearSelections() {
    this.selectedBrands = [];
    this.vehicleService.getAllVehicles();
  }

  onSelectBrand() {
    const totalBrands = this.selectedBrands.length;
    for (let i = 0; i < totalBrands; i++) {
      this.vehicleService.filterByBrandName(this.selectedBrands[i]);
    }
  }
}
