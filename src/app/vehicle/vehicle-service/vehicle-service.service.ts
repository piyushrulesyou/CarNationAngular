import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleResponse, EachVehicleResponse } from '../vehicle-models/VehicleModels';
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

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get<VehicleResponse>('vehicle-inventory/get-vehicle');
  }

  getVehicleById(vehicle_id: string) {
    return this.http.get<EachVehicleResponse>('vehicle-inventory/get-vehicle/' + vehicle_id)
      .pipe(
        tap(resData => {
          this.price = resData.data.priceMaster;
          this.priceMaster.next(this.price);
          this.tenure = resData.data.tenureMaster;
          this.tenureMaster.next(this.tenure);
        })
      );
  }
}
