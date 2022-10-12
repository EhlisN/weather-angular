import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeather } from '../model/weather.model';

const API_KEY = "d0ba4c8c7f39fb044c95318a05ddc6ca";
const API_URL = "https://api.openweathermap.org/data/2.5"

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeatherByCity(city: string): Observable<IWeather> {
    return this.httpClient.get<IWeather>(`${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  }
  getHourlyWeatherByCity(city: string): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}/forecast/hourly?q=${city}&appid=${API_KEY}`);
  }
}
