import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VehicleResponse, VehicleBrandResponse, CityResponse } from '../vehicle-models/VehicleModels';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  priceMaster = new Subject<any>();
  tenureMaster = new Subject<any>();
  price: any;
  tenure: any;
  response: any[];
  vehicleInventory = new Subject<VehicleResponse>();
  initialCitySubject = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get<VehicleResponse>('vehicle-inventory/get-vehicle?startPage=0&size=10').subscribe(
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

  filterBySegmentType(suv: boolean, sedan: boolean, hatchback: boolean) {
    let params = new HttpParams();
    params = params.append('suv', suv.toString());
    params = params.append('sedan', sedan.toString());
    params = params.append('hatchback', hatchback.toString());
    params = params.append('startPage', '0');
    params = params.append('size', '10');
    return this.http.get<VehicleResponse>('filters/segment', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  filterByTransmissionType(manual: boolean, auto: boolean) {
    let params = new HttpParams();
    params = params.append('manual', manual.toString());
    params = params.append('auto', auto.toString());
    params = params.append('startPage', '0');
    params = params.append('size', '10');
    return this.http.get<VehicleResponse>('filters/transmission', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  filterByFuelType(petrol: boolean, diesel: boolean) {
    let params = new HttpParams();
    params = params.append('petrol', petrol.toString());
    params = params.append('diesel', diesel.toString());
    params = params.append('startPage', '0');
    params = params.append('size', '10');
    return this.http.get<VehicleResponse>('filters/fuel', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  filterByPrice(minPrice: number, maxPrice: number) {
    let params = new HttpParams();
    params = params.append('minPrice', minPrice.toString());
    params = params.append('maxPrice', maxPrice.toString());
    params = params.append('startPage', '0');
    params = params.append('size', '10');
    return this.http.get<VehicleResponse>('filters/price', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }

  getAllBrands() {
    return this.http.get<VehicleBrandResponse>('producer/get-producers');
  }

  getAllCities() {
    return this.http.get<CityResponse>('cities/get-cities');
  }

  filterByBrandName(brand?: string[]) {
    if (brand) {
      let params = new HttpParams();
      params = params.append('startPage', '0');
      params = params.append('size', '10');
      return this.http.post<VehicleResponse>('filters/brand', { brands: brand }, { params: params }).subscribe(
        res => {
          console.log(res);
          this.vehicleInventory.next(res);
        }
      );
    }
  }

  filterByCity(city: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('startPage', '0');
    params = params.append('size', '10');
    return this.http.get<VehicleResponse>('filters/city', { params: params }).subscribe(
      res => {
        console.log(res);
        this.vehicleInventory.next(res);
      }
    );
  }
}
