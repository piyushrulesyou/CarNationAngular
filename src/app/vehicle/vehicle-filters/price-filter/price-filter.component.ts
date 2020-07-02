import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent implements OnInit {

  prices: {
    name: string,
    value: number
  }[] = [
      { name: '10,000', value: 10000 },
      { name: '15,000', value: 15000 },
      { name: '20,000', value: 20000 },
      { name: '25,000', value: 25000 },
      { name: '30,000', value: 30000 },
      { name: '35,000', value: 35000 },
      { name: '40,000', value: 40000 }
    ]
  minPrice: string = '10,000';
  maxPrice: string = '40,000';
  minSelectedPrice: any = { name: '10,000', value: 10000 };
  maxSelectedPrice: any = { name: '40,000', value: 40000 };
  isSelected: boolean = false;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
  }

  clearSelections() {
    this.isSelected = false;
    this.minSelectedPrice = { name: '10,000', value: 10000 };
    this.maxSelectedPrice = { name: '40,000', value: 40000 };
    let minPrice = this.minSelectedPrice.value;
    let maxPrice = this.maxSelectedPrice.value;
    this.vehicleService.filterByPrice(minPrice, maxPrice);
  }

  onSelectPrice() {
    this.isSelected = true;
    console.log("**");
    console.log(this.minSelectedPrice)
    console.log("__")
    console.log(this.maxSelectedPrice)
    let minPrice = this.minSelectedPrice.value;
    let maxPrice = this.maxSelectedPrice.value;
    this.vehicleService.filterByPrice(minPrice, maxPrice);
  }
}
