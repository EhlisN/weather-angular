import { Component, OnInit } from '@angular/core';
import { IForecast, IList } from './shared/model/forecast.model';
import { IWeather } from './shared/model/weather.model';
import { WeatherService } from './shared/service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  city: string = '';
  weatherToday!: IWeather;
  forecastArr!: IList[];
  forecastFiveDays!: IList[][];
  forecastToday!: IList[];
  selectedForecast!: IList[];
  isShowToday: boolean = false;
  isShowFiveDay: boolean = false;
  isShowMoreInfo: boolean = false;
  dayWeek: string = 'Today';
  notFound: string = '';
  errorMessage!: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  public showFiveDay() {
    this.isShowToday = false;
    this.isShowFiveDay = true;
  }

  public showOneDay() {
    this.isShowToday = true;
    this.isShowFiveDay = false;
    this.isShowMoreInfo = true;
    this.dayWeek = 'Today';
    this.selectedForecast = this.forecastToday;
  }

  public getWeatherByCity(city: string) {
    this.weatherService.getWeatherByCity(city).subscribe(
      (response: IWeather) => {
        this.notFound = '';
        this.weatherToday = response;
        this.getForecastByCity(city);
        this.showOneDay();
      },
      (err: Error) => {
        this.notFound = `'${city}' not found!!!`;
      }
    );
  }
  public getForecastByCity(city: string) {
    this.weatherService
      .getForecastByCity(city)
      .subscribe((response: IForecast) => {
        this.forecastArr = response.list;
        this.getArrForecast();
      });
  }
  public getArrForecast() {
    this.forecastFiveDays = [[], [], [], [], [], []];
    this.forecastFiveDays[0].push(this.forecastArr[0]);
    let day = 0;
    for (let i = 1; i < this.forecastArr.length; i++) {
      if (
        this.forecastArr[i].dt_txt.slice(0, 10) ===
        this.forecastFiveDays[day][0].dt_txt.slice(0, 10)
      ) {
        this.forecastFiveDays[day].push(this.forecastArr[i]);
      } else {
        day++;
        this.forecastFiveDays[day].push(this.forecastArr[i]);
      }
    }
    if (this.forecastFiveDays.length > 5) {
      this.forecastToday = this.forecastFiveDays[0].slice(0);
      this.forecastFiveDays.splice(0, 1);
    }
    this.selectedForecast = this.forecastToday;
  }
}
