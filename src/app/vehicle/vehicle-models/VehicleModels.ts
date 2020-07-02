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