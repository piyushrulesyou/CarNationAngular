import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent implements OnInit {

  minPriceArray: {
    name: string,
    value: number
  }[] = [
      { name: '10,000', value: 10000 },
      { name: '15,000', value: 15000 },
      { name: '20,000', value: 20000 },
      { name: '25,000', value: 25000 },
      { name: '30,000', value: 30000 },
      { name: '35,000', value: 35000 },
    ]
  maxPriceArray: {
    name: string,
    value: number
  }[] = [
      { name: '15,000', value: 15000 },
      { name: '20,000', value: 20000 },
      { name: '25,000', value: 25000 },
      { name: '30,000', value: 30000 },
      { name: '35,000', value: 35000 },
      { name: '40,000', value: 40000 }
    ]
  minPrice: string = '10,000';
  maxPrice: string = '40,000';

  isSelected: boolean = false;
  priceError: string;

  constructor(public vehicleService: VehicleService) {
    this.vehicleService.resetAllFilter.subscribe(
      reset => {
        if (reset) {
          this.clearSelections();
        }
      }
    )
  }

  ngOnInit(): void {
    if (this.vehicleService.minSelectedPrice.value != 10000 || this.vehicleService.maxSelectedPrice.value != 40000)
      this.isSelected = true;
  }

  clearSelections() {
    this.isSelected = false;
    this.priceError = "";
    this.vehicleService.minSelectedPrice = { name: '10,000', value: 10000 };
    this.vehicleService.maxSelectedPrice = { name: '40,000', value: 40000 };
    let minPrice = this.vehicleService.minSelectedPrice.value;
    let maxPrice = this.vehicleService.maxSelectedPrice.value;
    this.vehicleService.filterByPrice(minPrice, maxPrice);
  }

  onSelectPrice() {
    this.isSelected = true;
    let minPrice = this.vehicleService.minSelectedPrice.value;
    let maxPrice = this.vehicleService.maxSelectedPrice.value;
    if (minPrice > maxPrice) {
      this.priceError = "Minimum Price cannot be greater than Maximum Price"
    } else {
      this.priceError = "";
      this.vehicleService.filterByPrice(minPrice, maxPrice);
    }
  }
}
