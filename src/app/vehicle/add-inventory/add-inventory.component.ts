import { Component, OnInit } from '@angular/core';
import { AddInventoryModel } from '../vehicle-models/VehicleModels';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  constructor(private vehicleService: VehicleService,
    private cognitoUserService: CognitoUserService) { }

  addInventoryForm: AddInventoryModel;

  selectedColor: {
    colorCode: string,
    colorName: string,
    colorImage: string
  };
  availableColors: any[];
  selectedColors: any[] = [];
  selectedColorCodes: any[] = [];

  selectedCity: {
    cityCode: string
    cityName: string,
  };
  availableCities: any[];
  selectedCities: any[] = [];
  selectedCityCodes: any[] = [];

  selectedProducer: {
    producerCode: string;
    producerName: string;
  };
  availableProducers: any[];
  selectedProducerName: string;

  selectedPrice: {
    basePrice: number;
    discountAbsolute: number;
    discountPercentage: number;
  };
  availablePriceList: any[];
  selectedBasePrice: number;

  tenureArray: {
    months3: number, months6: number, months12: number, months18: number, months24: number, months36: number,
  };
  selectedFile: File;
  uploadedFiles: any[] = [];
  fuelType: string;
  transmissionType: string;
  segmentType: string;
  popular: boolean;
  smallSizeImage: any;
  fullSizeImage: any;

  ngOnInit(): void {
    this.addInventoryForm = new AddInventoryModel();
    this.vehicleService.getAllColors().subscribe(
      response => {
        this.availableColors = response.data;
      }
    )
    this.vehicleService.getAllCities().subscribe(
      response => {
        this.availableCities = response.data.cities;
      }
    )
    this.vehicleService.getAllBrands().subscribe(
      response => {
        this.availableProducers = response.data.producers;
      }
    )
    this.vehicleService.getPriceList().subscribe(
      response => {
        this.availablePriceList = response.data;
      }
    )
    this.tenureArray = {
      months3: 0, months6: 0, months12: 0, months18: 0, months24: 0, months36: 0,
    }
  }

  onSelectColor() {
    if (this.selectedColor != null && !this.selectedColors.includes(this.selectedColor)) {
      this.selectedColors.push(this.selectedColor);
      this.selectedColorCodes.push(this.selectedColor.colorCode);
    }
    this.selectedColor = {
      colorCode: '', colorImage: '', colorName: ''
    }
  }

  onSelectCity() {
    if (this.selectedCity != null && !this.selectedCities.includes(this.selectedCity)) {
      this.selectedCities.push(this.selectedCity);
      this.selectedCityCodes.push(this.selectedCity.cityCode);
    }
    this.selectedCity = {
      cityCode: '', cityName: ''
    }
  }

  onSelectProducer() {
    if (this.selectedProducer != null)
      this.selectedProducerName = this.selectedProducer.producerCode;
  }

  onSelectPrice() {
    if (this.selectedPrice != null)
      this.selectedBasePrice = this.selectedPrice.basePrice;
  }

  removeSelectedCity(city: any, cityIndex: number) {
    if (this.selectedCities.includes(city)) {
      this.selectedCities.splice(cityIndex, 1);
    }
  }

  removeSelectedColor(color: any, colorIndex: number) {
    if (this.selectedColors.includes(color)) {
      this.selectedColors.splice(colorIndex, 1);
    }
  }

  onSubmitAddInventory() {
    this.addInventoryForm.fuelType = this.fuelType;
    this.addInventoryForm.transmissionType = this.transmissionType;
    this.addInventoryForm.colorMaster = this.selectedColorCodes;
    this.addInventoryForm.carType = this.segmentType;
    this.addInventoryForm.producer = this.selectedProducerName;
    this.addInventoryForm.popular = this.popular;
    this.addInventoryForm.priceMaster = this.selectedBasePrice;
    this.addInventoryForm.cityMaster = this.selectedCityCodes;
    this.addInventoryForm.showVariant = true;
    this.addInventoryForm.tenureMaster = this.prepareTenureMaster(this.tenureArray);
    this.addInventoryForm.createdBy = this.cognitoUserService.getCurrentUser().getUsername();
    this.addInventoryForm.createdDate = new Date();
    this.addInventoryForm.modifiedBy = this.cognitoUserService.getCurrentUser().getUsername();
    this.addInventoryForm.modifiedDate = new Date();
    console.log(this.addInventoryForm);
    this.vehicleService.addNewInventory(this.smallSizeImage, this.fullSizeImage, this.addInventoryForm)
  }

  smallImageUpload(event) {
    this.smallSizeImage = event.files[0];
  }

  fullImageUpload(event) {
    this.fullSizeImage = event.files[0];
  }

  prepareTenureMaster(tenureArray: any): number[] {
    let tenurePriceMultiplier = [];
    tenurePriceMultiplier.push(tenureArray.months3);
    tenurePriceMultiplier.push(tenureArray.months6);
    tenurePriceMultiplier.push(tenureArray.months12);
    tenurePriceMultiplier.push(tenureArray.months18);
    tenurePriceMultiplier.push(tenureArray.months24);
    tenurePriceMultiplier.push(tenureArray.months36);
    return tenurePriceMultiplier;
  }
}
