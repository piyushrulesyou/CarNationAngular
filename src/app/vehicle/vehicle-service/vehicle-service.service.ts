import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VehicleResponse, VehicleBrandResponse, CityResponse, VehicleFilterRequest, AddInventoryModel, ColorResponse, PriceListResponse } from '../vehicle-models/VehicleModels';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  selectedSegments: string[] = [];
  selectedTransmissions: string[] = [];
  selectedFuels: string[] = [];
  selectedBrands: string[] = [];
  minSelectedPrice: any = { name: '10,000', value: 10000 };
  maxSelectedPrice: any = { name: '40,000', value: 40000 };

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


  constructor(private http: HttpClient, private cognitoUserService: CognitoUserService) {
    let currentCity = localStorage.getItem('cityName');
    this.initialCitySubject.next(currentCity);
  }

  addNewInventory(smallSizeImage: any, fullSizeImage: any, addInventoryData: AddInventoryModel) {
    let formData = new FormData();
    formData.append('smallSizeImage', smallSizeImage, smallSizeImage.name);
    formData.append('fullSizeImage', fullSizeImage, fullSizeImage.name);
    formData.append('vehicleInventory', JSON.stringify(addInventoryData))
    let header = new HttpHeaders();
    header.append('Content-Type', undefined)
    return this.http.post<AddInventoryModel>('vehicle-inventory/add-inventory', formData).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  getAllVehicles(startPage: number) {
    return this.http.get<VehicleResponse>('vehicle-inventory/get-vehicle?startPage=' + startPage + '&size=' + this.carsPerPage).subscribe(
      res => {
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

  getAllColors() {
    return this.http.get<ColorResponse>('colors/get-colors');
  }

  getPriceList() {
    return this.http.get<PriceListResponse>('price/get-price-list');
  }

  filterBySegmentType(suv: boolean, sedan: boolean, hatchback: boolean) {
    if (suv || sedan || hatchback) {
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
    if (manual || auto) {
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
    if (petrol || diesel) {
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
    this.filterVehicleListing(0, true);
  }

  filterVehicleListing(pageNumber: number, onInit: boolean) {
    this.pageNumber.next(pageNumber);
    if (pageNumber == 0)
      this.newInventoryLoaded.next(true);
    if (onInit) {
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
