import { Component, Input, OnInit } from '@angular/core';
import { IList } from 'src/app/shared/model/forecast.model';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss'],
})
export class ForecastCardComponent implements OnInit {
  @Input() forecastHourly!: IList;
  @Input() day!: string;

  constructor() {}

  ngOnInit(): void {}

  public getTemp(temp: number) {
    return Math.round(temp);
  }

  public getIcon(iconName: string): string {
    return `http://openweathermap.org/img/w/${iconName}.png`;
  }
}
