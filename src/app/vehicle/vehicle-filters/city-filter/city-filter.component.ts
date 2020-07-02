import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';

@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.css']
})
export class CityFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }
  cities: {
    cityCode: string,
    cityName: string
  }[] = [];

  ngOnInit(): void {
    this.vehicleService.getAllCities().subscribe(
      cities => {
        this.cities = cities.data.cities;
      })
  }

}
