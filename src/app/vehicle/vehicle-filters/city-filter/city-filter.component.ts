import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.css']
})
export class CityFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService) {
    this.vehicleService.resetAllFilter.subscribe(
      reset => {
        if (reset == true) {
          this.vehicleService.filterByCity(null);
          this.vehicleService.initialCitySubject.next('Agra');
          this.selectedCity = { cityCode: 'AGA', cityName: 'Agra' };
        }
      }
    )
  }
  cities: {
    cityCode: string,
    cityName: string
  }[] = [];
  initialCity: string = 'Agra';
  selectedCity:
    {
      cityCode: string,
      cityName: string
    } = { cityCode: 'AGA', cityName: 'Agra' };



  ngOnInit(): void {
    this.vehicleService.initialCitySubject.next('Agra');
    this.vehicleService.getAllCities().subscribe(
      cities => {
        this.cities = cities.data.cities;
      })
  }

  onSelectCity() {
    this.vehicleService.initialCitySubject.next(this.selectedCity.cityName);
    const selectedCity = this.selectedCity.cityCode;
    this.vehicleService.filterByCity(selectedCity);
  }
}
