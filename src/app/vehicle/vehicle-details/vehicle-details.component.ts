import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle-service/vehicle-service.service';
import { CognitoUserService } from '../../core/cognito-service/cognito-user.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  vehicleId: string;
  vehicleDetails: any;
  vehicleDetailsList: any[];
  isLoading: boolean = false;
  colors: any[];
  deliveryDate: any = {};

  constructor(private vehicleService: VehicleService, private activatedRoute: ActivatedRoute, private cognitoUserService: CognitoUserService, private router: Router) { }

  ngOnInit(): void {

    if (!this.cognitoUserService.isLoggedIn()) {
      this.router.navigate(['/user/login']);
    }

    this.isLoading = true;
    this.vehicleId = this.activatedRoute.snapshot.params['vehicleId'];
    this.activatedRoute.params.subscribe(
      params => {
        this.vehicleId = params['vehicleId'];
      }
    )
    this.vehicleService.getVehicleById(this.vehicleId).subscribe(
      response => {
        this.vehicleDetailsList = response.data.listVehicleDTO.splice(0);
        this.vehicleDetails = this.vehicleDetailsList[0];
        this.colors = this.vehicleDetails.colorMaster;
        this.isLoading = false;
      }
    );
    this.findDeliveryDate();
  }
  findDeliveryDate() {
    const today = new Date();
    const newDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.deliveryDate.date = newDate.getDate();
    this.deliveryDate.month = newDate.toLocaleString('default', { month: 'long' });
    this.deliveryDate.year = newDate.getFullYear();
  }
}
