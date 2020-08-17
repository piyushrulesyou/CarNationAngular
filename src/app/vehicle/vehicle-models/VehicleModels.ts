export interface VehicleResponse {
  error: boolean;
  errors: any[];
  data: {
    listVehicleDTO: [],
    totalPages: number,
    totalEnteries: number
  };
}

export interface VehicleBrandResponse {
  error: boolean;
  errors: any[];
  data: {
    producers: {
      producerCode: string,
      producerName: string
    }[]
  }
}

export interface PriceListResponse {
  error: boolean;
  errors: any[];
  data: {
    basePrice: number,
    discountAbsolute: number,
    discountPercentage: number,
  }[]

}
export interface CityResponse {
  error: boolean;
  errors: any[];
  data: {
    cities: {
      cityCode: string,
      cityName: string
    }[],
    activeCities: {
      cityCode: string,
      cityName: string
    }[]
  }
}

export interface ColorResponse {
  error: boolean;
  errors: any[];
  data: any[];
}

export class VehicleFilterRequest {
  public city: boolean
  public cityName: string
  public price: boolean
  public minPrice: number
  public maxPrice: number
  public segment: boolean
  public suvSegment: boolean
  public hatchBackSegment: boolean
  public sedanSegment: boolean
  public fuel: boolean
  public petrolFuel: boolean
  public dieselFuel: boolean
  public transmission: boolean
  public manualTransmission: boolean
  public automaticTransmission: boolean
  public brand: boolean
  public brands: string[]

  VehicleFilterRequest() {
    this.city = true;
    this.cityName = '';
    this.price = false;
    this.minPrice = 0;
    this.maxPrice = 0;
    this.segment = false;
    this.suvSegment = false;
    this.hatchBackSegment = false;
    this.sedanSegment = false;
    this.fuel = false;
    this.petrolFuel = false;
    this.dieselFuel = false;
    this.transmission = false;
    this.manualTransmission = false;
    this.automaticTransmission = false;
    this.brand = false;
    this.brands = [];
  }
}

export class AddInventoryModel {
  id: string;
  variant: string;
  model: string;
  fuelType: string;
  transmissionType: string;
  colorMaster: string[];
  carType: string;
  seats: string;
  producer: string;
  sortOrder: number;
  fullSizeImageURL: string;
  smallSizeImageURL: string;
  popular: boolean;
  extraKmCharge: number;
  priceMaster: number;
  insuranceCost: number;
  cityMaster: string[];
  securityDeposit: number;
  showVariant: boolean;
  tenureMaster: number[];
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
}