import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { ActivatedRoute } from '@angular/router';

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
