import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VehicleResponse, VehicleBrandResponse, CityResponse, VehicleFilterRequest } from '../vehicle-models/VehicleModels';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  selectedSegments: string[] = [];
  selectedTransmissions: string[] = [];
  selectedFuels: string[] = [];
  selectedBrands: string[] = [];

  priceMaster = new Subject<any>();
  tenureMaster = new Subject<any>();
  price: any;
  tenure: any;
  response: any[];
  vehicleInventory = new Subject<VehicleResponse>();
  initialCitySubject = new Subject<string>();
  filters: VehicleFilterRequest = new VehicleFilterRequest();
  appliedFilters = new Subject<VehicleFilterRequest>();
  resetAllFilter = new Subject<boolean>();
  carsPerPage: number = environment.carsPerPage;
  pageNumber = new Subject<number>();
  newInventoryLoaded = new Subject<boolean>();


  constructor(private http: HttpClient) {
    let currentCity = localStorage.getItem('cityName');
    this.initialCitySubject.next(currentCity);
  }

  getAllVehicles(startPage: number) {
    return this.http.get<VehicleResponse>('vehicle-inventory/get-vehicle?startPage=' + startPage + '&size=' + this.carsPerPage).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  getVehicleById(vehicle_id: string) {
    return this.http.get<VehicleResponse>('vehicle-inventory/get-vehicle/' + vehicle_id)
      .pipe(
        tap(resData => {
          this.response = resData.data.listVehicleDTO
          this.price = this.response[0].priceMaster;
          this.priceMaster.next(this.price);
          this.tenure = this.response[0].tenureMaster;
          this.tenureMaster.next(this.tenure);
        })
      );
  }

  getAllBrands() {
    return this.http.get<VehicleBrandResponse>('producer/get-producers');
  }

  getAllCities() {
    return this.http.get<CityResponse>('cities/get-cities');
  }

  getActiveCities() {
    return this.http.get<CityResponse>('cities/get-active-cities');
  }

  filterBySegmentType(suv: boolean, sedan: boolean, hatchback: boolean) {
    if (suv == true || sedan == true || hatchback == true) {
      this.filters.segment = true;
      this.filters.suvSegment = suv;
      this.filters.sedanSegment = sedan;
      this.filters.hatchBackSegment = hatchback;
    } else {
      this.filters.segment = false;
    }
    this.appliedFilters.next(this.filters);
    this.filterVehicleListing(0, false);
  }

  filterByTransmissionType(manual: boolean, auto: boolean) {
    if (manual == true || auto == true) {
      this.filters.transmission = true;
      this.filters.manualTransmission = manual;
      this.filters.automaticTransmission = auto;
    } else {
      this.filters.transmission = false;
    }
    this.appliedFilters.next(this.filters);
    this.filterVehicleListing(0, false);
  }

  filterByFuelType(petrol: boolean, diesel: boolean) {
    if (petrol == true || diesel == true) {
      this.filters.fuel = true;
      this.filters.petrolFuel = petrol;
      this.filters.dieselFuel = diesel;
    } else {
      this.filters.fuel = false;
    }
    this.appliedFilters.next(this.filters);
    this.filterVehicleListing(0, false);
  }

  filterByPrice(minPrice: number, maxPrice: number) {
    this.filters.price = true;
    this.filters.minPrice = minPrice;
    this.filters.maxPrice = maxPrice;
    this.appliedFilters.next(this.filters);
    this.filterVehicleListing(0, false);
  }

  filterByBrandName(brand?: string[]) {
    if (brand.length == 0)
      this.filters.brand = false
    else {
      this.filters.brand = true;
      this.filters.brands = brand;
    }
    this.appliedFilters.next(this.filters);
    this.filterVehicleListing(0, false);
  }

  filterByCity(city: string) {
    if (city == null)
      this.filters.city = false;
    else {
      this.filters.city = true;
      this.filters.cityName = city;
    }
    this.appliedFilters.next(this.filters);
    this.filterVehicleListing(0, false);
  }

  clearAllFilters() {
    this.filters = new VehicleFilterRequest();
    this.appliedFilters.next(this.filters);
    this.filterVehicleListing(0, false);
  }

  filterVehicleListing(pageNumber: number, onInit: boolean) {
    this.pageNumber.next(pageNumber);
    if (pageNumber == 0)
      this.newInventoryLoaded.next(true);
    if (onInit == true) {
      this.filters.city = true;
      this.filters.cityName = localStorage.getItem('cityCode');
      this.appliedFilters.next(this.filters);
    }
    return this.http.post<VehicleResponse>('filters/all-filters?startPage=' + pageNumber + '&size=' + this.carsPerPage, this.filters).subscribe(
      res => {
        this.vehicleInventory.next(res);
      }
    )
  }

  filterBySegmentType2(suv: boolean, sedan: boolean, hatchback: boolean) {
    let params = new HttpParams();
    params = params.append('suv', suv.toString());
    params = params.append('sedan', sedan.toString());
    params = params.append('hatchback', hatchback.toString());
    return this.http.get<VehicleResponse>('filters/segment', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  filterByTransmissionType2(manual: boolean, auto: boolean) {
    let params = new HttpParams();
    params = params.append('manual', manual.toString());
    params = params.append('auto', auto.toString());
    return this.http.get<VehicleResponse>('filters/transmission', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  filterByFuelType2(petrol: boolean, diesel: boolean) {
    let params = new HttpParams();
    params = params.append('petrol', petrol.toString());
    params = params.append('diesel', diesel.toString());
    return this.http.get<VehicleResponse>('filters/fuel', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  filterByPrice2(minPrice: number, maxPrice: number) {
    let params = new HttpParams();
    params = params.append('minPrice', minPrice.toString());
    params = params.append('maxPrice', maxPrice.toString());
    return this.http.get<VehicleResponse>('filters/price', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  filterByBrandName2(brand?: string[]) {
    if (brand) {
      return this.http.post<VehicleResponse>('filters/brand', { brands: brand }).subscribe(
        res => {
          console.log(res);
          this.vehicleInventory.next(res);
        }
      );
    }
  }

  filterByCity2(city: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    return this.http.get<VehicleResponse>('filters/city', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }
}
