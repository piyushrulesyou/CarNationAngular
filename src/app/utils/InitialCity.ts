import { environment } from '../../environments/environment';
export class InitialCity {

    public static updateInitialCity() {
        if (localStorage.getItem('cityName') == null) {
            localStorage.setItem('cityName', environment.initialCityName);
        }
        if (localStorage.getItem('cityCode') == null) {
            localStorage.setItem('cityCode', environment.initialCityCode);
        }
    }
}