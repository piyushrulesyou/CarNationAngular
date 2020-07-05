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

export interface CityResponse {
  error: boolean;
  errors: any[];
  data: {
    cities: {
      cityCode: string,
      cityName: string
    }[]
  }
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

  VehicleFilterRequest(city: boolean,
    cityName: string,
    price: boolean,
    minPrice: number,
    maxPrice: number,
    segment: boolean,
    suvSegment: boolean,
    hatchBackSegment: boolean,
    sedanSegment: boolean,
    fuel: boolean,
    petrolFuel: boolean,
    dieselFuel: boolean,
    transmission: boolean,
    manualTransmission: boolean,
    automaticTransmission: boolean,
    brand: boolean,
    brands: string[]) {
    this.city = city;
    this.cityName = cityName;
    this.price = price;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.segment = segment;
    this.suvSegment = suvSegment;
    this.hatchBackSegment = hatchBackSegment;
    this.sedanSegment = sedanSegment;
    this.fuel = fuel;
    this.petrolFuel = petrolFuel;
    this.dieselFuel = dieselFuel;
    this.transmission = transmission;
    this.manualTransmission = manualTransmission;
    this.automaticTransmission = automaticTransmission;
    this.brand = brand;
    this.brands = brands;
  }
}