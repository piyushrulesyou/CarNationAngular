import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleResponse, EachVehicleResponse } from '../vehicle-models/VehicleModels';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get<VehicleResponse>('vehicle-inventory/get-vehicle');
  }

  getVehicleById(vehicle_id: string) {
    return this.http.get<EachVehicleResponse>('vehicle-inventory/get-vehicle/' + vehicle_id);
  }
}
