import { Component, OnInit } from '@angular/core';
import { IWeather } from './shared/model/weather.model';
import { WeatherService } from './shared/service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  city: string = '';
  weatherDay!: IWeather;
  
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    
  }

  getWeatherByCity(city: string) {
    this.weatherService.getWeatherByCity(this.city).subscribe((response: IWeather) => {
      this.weatherDay = response;
      console.log(response)
    })
  }

}
