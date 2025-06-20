import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IForecastResponse, IWeather } from 'src/app/shared/contracts/open-weather/IForecast';
import { IGeocodingResponse } from 'src/app/shared/contracts/open-weather/IGeocoding';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { ImgAssetsUtil } from 'src/app/shared/utils/img-assets-util';

@Component({
    selector: 'app-more-days-forecast',
    templateUrl: './more-days-forecast.component.html',
    styleUrls: ['./more-days-forecast.component.scss'],
    standalone: false
})
export class MoreDaysForecastComponent implements OnInit {
  
  public geodoce!: IGeocodingResponse;
  public forecastResponse$!: Observable<{forecast: IForecastResponse}>;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    let geocode = this._sessionStorageService.getItem('current_city');
    if (!!geocode) {
      this.geodoce = JSON.parse(geocode);
    }
    
    this.forecastResponse$ = this._activatedRoute.data as Observable<{forecast: IForecastResponse}>;
  }

  public prevPage(): void {
    this._router.navigate(['/weather']);
  }

  public locationDesc(): string {    
    return `${this.geodoce.name}${this.geodoce.state ? ', ' + this.geodoce.state : ''}, ${ this.geodoce.country }`;    
  }

  public weatherIcon(weather: IWeather[]): string {
    return ImgAssetsUtil.getUrlIcon(weather[0].icon);
  }

  public calcTime(dt: number, offset: number): number {
    const localOffset = -1 * new Date().getTimezoneOffset() * 60;
    
    return (dt + offset - localOffset) * 1000;
  }

  public capitalize(text: string, all?: boolean): string {
    if (all) {
      text = text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    
    return text;
  }

}
