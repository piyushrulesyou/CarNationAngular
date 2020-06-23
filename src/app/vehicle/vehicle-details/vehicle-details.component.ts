import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicleId: string;
  vehicleDetails: any;
  isLoading: boolean = false;

  constructor(private vehicleService: VehicleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleId = this.activatedRoute.snapshot.params['vehicleId'];
    this.activatedRoute.params.subscribe(
      params => {
        this.vehicleId = params['vehicleId'];
      }
    )
    this.vehicleService.getVehicleById(this.vehicleId).subscribe(
      response => {
        this.vehicleDetails = response.data;
        this.isLoading = false;
      }
    );
  }

}
