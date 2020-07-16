import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../vehicle-service/vehicle-service.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-city-filter',
  templateUrl: './city-filter.component.html',
  styleUrls: ['./city-filter.component.css']
})
export class CityFilterComponent implements OnInit {

  constructor(private vehicleService: VehicleService) {
    this.vehicleService.resetAllFilter.subscribe(
      reset => {
        if (reset) {
          this.vehicleService.filterByCity(null);
          this.selectedCity = { cityCode: environment.initialCityCode, cityName: environment.initialCityName };
        }
      }
    )
  }
  cities: {
    cityCode: string,
    cityName: string
  }[] = [];
  activeCities: {
    cityCode: string,
    cityName: string,
  }[] = [];
  displayCities = [];


  initialCity: string = localStorage.getItem('cityName');
  initialCityCode: string = localStorage.getItem('cityCode');
  selectedCity:
    {
      cityCode: string,
      cityName: string
    } = { cityCode: this.initialCityCode, cityName: this.initialCity };
  cityError: string;
  cityErrorCity: string;

  ngOnInit(): void {
    this.vehicleService.getAllCities().subscribe(
      cities => {
        this.cities = cities.data.cities;
        this.vehicleService.getActiveCities().subscribe(
          activeCities => {
            this.activeCities = activeCities.data.activeCities;
          }
        )
      })
  }

  onSelectCity() {
    this.cityError = '';
    this.cityErrorCity = '';
    if (!this.isPresent(this.selectedCity.cityCode)) {
      this.cityError = "Currently no inventory in ";
      this.cityErrorCity = this.selectedCity.cityName;
    } else {
      localStorage.setItem('cityName', this.selectedCity.cityName);
      localStorage.setItem('cityCode', this.selectedCity.cityCode);
      this.vehicleService.initialCitySubject.next(this.selectedCity.cityName);
      const selectedCity = this.selectedCity.cityCode;
      this.vehicleService.filterByCity(selectedCity);
    }
  }


  isPresent(cityCode: string): boolean {
    for (let i = 0; i < this.activeCities.length; i++) {
      if (this.activeCities[i].cityCode == cityCode)
        return true;
    }
    return false;
  }
}
