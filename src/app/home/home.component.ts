import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Declarations of Variables
  listCitysWeather: any;
  listWeatherForecast: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }

  /**
   * The method receive a city name by parameters and search this city on weatherService
   * @author Wagner Camargo Castilho
   * 
   * @param form form of html - Required.
   * @return an `Observable` of the body as type `any`.
   */
  searchCity(form: NgForm) {
    this.weatherService.getWeatherByCity(form.value['cityInput']).subscribe(
      data => {
        this.listCitysWeather = data['list'];
      },
      err => {
        alert("Erro ao obter as cidades. Contate o administrador");
        console.log("erro", err);
      }
    )
  }

  /**
   * The method update a modal weather forecast
   * @author Wagner Camargo Castilho
   * 
   * @param data data of city - Required.
   * @return an `Observable` of the body as type `any`.
   */
  updateModalObj(data) {
    let dateLocaleTemp;
    let timeTemp;
    let hoursTemp;
    let minutesTemp;

    this.weatherService.getWeatherForecastByCity(data.id).subscribe(
      data => {
        for (var i = 0; i < data.list.length; i++) {
          dateLocaleTemp = new Date(data.list[i].dt_txt);
          
          if (dateLocaleTemp.getHours() < 10 ? hoursTemp = '0' + dateLocaleTemp.getHours() : hoursTemp = dateLocaleTemp.getHours())
          if (dateLocaleTemp.getMinutes() < 10 ? minutesTemp = '0' + dateLocaleTemp.getMinutes() : minutesTemp = dateLocaleTemp.getMinutes())
          
          timeTemp = hoursTemp + ':' + minutesTemp;
          data.list[i].dt_txt = new Date(data.list[i].dt_txt).toString().substring(0, 10) + ' ' + timeTemp;
        }
        this.listWeatherForecast = data;
      },
      err => {
        alert("Erro ao chamar a API weatherForecast. Contate o administrador");
        console.log("erro", err);
      });
  }

}
