import { Component, Input, OnInit } from '@angular/core';
import { IWeather } from 'src/app/shared/model/weather.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() weatherDay!: IWeather;

  constructor() { }

  ngOnInit(): void {
  }

  getDate(ms: number) {
    let date = new Date(ms);
    console.log(date.toString())
    // console.log(date.getHours())
    // console.log(date.getMinutes())
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  getIcon(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`
  }

}
