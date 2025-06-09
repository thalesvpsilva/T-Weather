import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ICurrent, IForecastPayload, IForecastResponse, IWeather, Icon } from 'src/app/shared/contracts/open-weather/IForecast';
import { IGeocodingResponse } from 'src/app/shared/contracts/open-weather/IGeocoding';
import { OpenWeatherService } from 'src/app/shared/services/open-weather.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { ImgAssetsUtil } from 'src/app/shared/utils/img-assets-util';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss'],
    standalone: false
})
export class WeatherComponent implements OnInit {

  public localOffset: number;
  public currentHour: number;
  public geodoce!: IGeocodingResponse;
  public forecast$!: Observable<IForecastResponse>;

  constructor(
    private _openWeatherService: OpenWeatherService,
    private _sessionStorageService: SessionStorageService
  ) {
    this.localOffset = new Date().getTimezoneOffset() * 60 * -1;
    this.currentHour = Math.round(new Date().getTime() / 1000);
  }


  ngOnInit(): void {
    let geocode = this._sessionStorageService.getItem('current_city');
    if (!!geocode) {
      this.geodoce = JSON.parse(geocode);
      this._requestForecast(this.geodoce.lat, this.geodoce.lon);
    }
  }

  private _requestForecast(lat: number, lon: number): void {
    const request: IForecastPayload = {
      lat: lat,
      lon: lon,
      exclude: ['minutely', 'daily'],
      units: 'metric',
    };
    this.forecast$ = this._openWeatherService.getWeatherInfo(request);
  }

  private _calcTime(dt: number, offset: number): number {
    return (dt + offset - this.localOffset);
  }

  public locationSelected(event: IGeocodingResponse): void {
    this.geodoce = event;
    this._sessionStorageService.setItem('current_city', JSON.stringify(event));
    this._requestForecast(event.lat, event.lon);
  }

  public forecastQueryParams(): object {    
    return { lat: this.geodoce.lat, lon: this.geodoce.lon };    
  }

  public locationDesc(): string {    
    return `${this.geodoce.name}${this.geodoce.state ? ', ' + this.geodoce.state : ''}, ${ this.geodoce.country }`;    
  }

  public weatherDesc(currentWeather: ICurrent): string {
    return currentWeather.weather[0].main;
  }

  public minDegrees(hourly: ICurrent[]): number {
    return hourly.sort((a, b) => a.temp < b.temp ? -1 : a.temp > b.temp ? 1 : 0)[0].temp;
  }

  public maxDegrees(hourly: ICurrent[]): number {
    return hourly.sort((a, b) => a.temp > b.temp ? -1 : a.temp < b.temp ? 1 : 0)[0].temp;
  }

  public rainPop(forecast: IForecastResponse): number {
    return (forecast.hourly
        .filter(a => {
          const nextHour = (this._calcTime(a.dt, forecast.timezone_offset) - this.currentHour)
          return nextHour < 3600 && nextHour > 0;
        })
        [0]?.pop ?? 0) * 100;
  }
  
  public showSunInfo(forecast: IForecastResponse): boolean {
    return !!forecast.current.sunrise || !!forecast.current.sunset;
  }

  public weatherIcon(forecast: IForecastResponse): string {
    return ImgAssetsUtil.getUrlIcon(forecast.current.weather[0].icon);
  }

  public backgroundImg(forecast: IForecastResponse): string {
    return `id-${forecast.current.weather[0].icon}`;
  }

  public calcTime(field: string, forecast: IForecastResponse): number {
    const timeObj = {
      'dt': () => forecast.current.dt * 1000,
      'sunrise': () => (forecast.current.sunrise ?? 0) * 1000,
      'sunset': () => (forecast.current.sunset ?? 0) * 1000
    };

    return this._calcTime(timeObj[field as keyof typeof timeObj](), forecast.timezone_offset);
  }
}
