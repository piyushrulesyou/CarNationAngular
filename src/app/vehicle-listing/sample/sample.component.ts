import { Component, OnInit } from '@angular/core';

interface VehicleResponse {
  error: any;
  errors: any;
  data: any[];
}

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  vehicle: VehicleResponse;
  vehicleList: any[];
  isLoading: boolean = false;
  totalCars: number;
  constructor() { }

  ngOnInit(): void {
    this.vehicleList = [
      {
        producer: {
          producerName: 'Maruti Suzuki',
          modelCode: 'WagonR',
          variantName: 'LXI'
        },
        priceMaster: {
          basePrice: 15000,
          discountAbsolute: 2000
        },
        fuelType: {
          fuelName: 'Petrol',
          fuelTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/gas.png'
        },
        transmissionType: {
          transmissionTypeName: 'Automatic',
          transmissionTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/automatic-transmission.png'
        },
        smallSizeImage: "https://s3-us-west-2.amazonaws.com/revvselfdrivecar/Open/SUV_new/Hyundai_creta.jpg"
      },
      {
        producer: {
          producerName: 'Maruti Suzuki',
          modelCode: 'WagonR',
          variantName: 'LXI'
        },
        priceMaster: {
          basePrice: 15000,
          discountAbsolute: 2000
        },
        fuelType: {
          fuelName: 'Petrol',
          fuelTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/gas.png'
        },
        transmissionType: {
          transmissionTypeName: 'Automatic',
          transmissionTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/automatic-transmission.png'
        },
        smallSizeImage: "https://s3-us-west-2.amazonaws.com/revvselfdrivecar/Open/SUV_new/Hyundai_creta.jpg"
      },
      {
        producer: {
          producerName: 'Maruti Suzuki',
          modelCode: 'WagonR',
          variantName: 'LXI'
        },
        priceMaster: {
          basePrice: 15000,
          discountAbsolute: 2000
        },
        fuelType: {
          fuelName: 'Petrol',
          fuelTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/gas.png'
        },
        transmissionType: {
          transmissionTypeName: 'Manual',
          transmissionTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/manual-transmission.png'
        },
        smallSizeImage: "https://s3-us-west-2.amazonaws.com/revvselfdrivecar/Open/SUV_new/Hyundai_creta.jpg"
      },
      {
        producer: {
          producerName: 'Maruti Suzuki',
          modelCode: 'WagonR',
          variantName: 'LXI'
        },
        priceMaster: {
          basePrice: 15000,
          discountAbsolute: 2000
        },
        fuelType: {
          fuelName: 'Petrol',
          fuelTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/gas.png'
        },
        transmissionType: {
          transmissionTypeName: 'Manual',
          transmissionTypeImage: 'https://car-renting-service-images.s3.ap-south-1.amazonaws.com/manual-transmission.png'
        },
        smallSizeImage: "https://s3-us-west-2.amazonaws.com/revvselfdrivecar/Open/SUV_new/Hyundai_creta.jpg"
      }
    ]
    this.totalCars = this.vehicleList.length;
  }
}
