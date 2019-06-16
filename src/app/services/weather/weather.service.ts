import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url: string = 'https://api.openweathermap.org/data/2.5/find?q=';
  urlForecast: string = 'https://api.openweathermap.org/data/2.5/forecast?id=';
  appKey: string = '&appId=76d1b43ba3695cfae59aa9f7dc9b4877';

  constructor(private http: HttpClient) { }

  getWeatherByCity(cityName: string) {
    return this.http.get<any>(this.url + cityName + this.appKey);
  }

  getWeatherForecastByCity(cityId) {
    return this.http.get<any>(this.urlForecast + cityId + this.appKey);
  }
}
