import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-listing-price',
  templateUrl: './vehicle-listing-price.component.html',
  styleUrls: ['./vehicle-listing-price.component.css']
})
export class VehicleListingPriceComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }
  priceMaster: any;
  tenureMaster: any;
  tenureArray: {
    month: number,
    price: number
  }[] = [];
  discountedPrice: number;
  basePrice: number;
  showPrice: boolean = false;
  highlightMonth: boolean = false;
  index: number;
  basePriceWithComma: string;
  discountedPriceWithComma: string;

  ngOnInit(): void {
    this.priceMaster = this.vehicleService.price;
    this.vehicleService.priceMaster.subscribe(
      price => {
        this.priceMaster = price;
      }
    )
    this.tenureMaster = this.vehicleService.tenure;
    this.vehicleService.tenureMaster.subscribe(
      tenure => {
        this.tenureMaster = tenure;
      }
    )
    this.prepareTenureArray(this.tenureMaster)
    this.activeMonth(this.tenureArray.length - 1);
  }

  prepareTenureArray(tenureMaster: any) {
    this.tenureArray.push({
      //index: 0,
      month: 3,
      price: tenureMaster.months3
    });
    this.tenureArray.push({
      month: 6,
      price: tenureMaster.months6
    });
    this.tenureArray.push({
      month: 12,
      price: tenureMaster.months12
    });
    this.tenureArray.push({
      month: 18,
      price: tenureMaster.months18
    });
    this.tenureArray.push({
      month: 24,
      price: tenureMaster.months24
    });
    this.tenureArray.push({
      month: 36,
      price: tenureMaster.months36
    });
  }

  activeMonth(index: number) {
    this.showPrice = true;
    this.highlightMonth = true;
    this.index = index;
    this.basePrice = this.priceMaster.basePrice * this.tenureArray[index].price;
    this.discountedPrice = (this.priceMaster.basePrice - this.priceMaster.discountAbsolute) * this.tenureArray[index].price;
    this.basePriceWithComma = this.priceWithComma(this.basePrice);
    this.discountedPriceWithComma = this.priceWithComma(this.discountedPrice);
  }

  priceWithComma(price: number) {
    var str = price.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1');
    }
    return str.join('.');
  }
}