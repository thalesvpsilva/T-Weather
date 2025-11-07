import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { IGeocodingPayload, IGeocodingResponse } from '../contracts/open-weather/IGeocoding';
import { IForecastPayload, IForecastResponse } from '../contracts/open-weather/IForecast';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  protected httpClient = inject(HttpClient);

  constructor() { }

  private _buildHttpParams(data: object): HttpParams {
    return Object
      .entries(data)
      .reduce((params, [key, value]) => params.set(key, value), new HttpParams());
  }

  public getGeocoding(payload: IGeocodingPayload): Observable<IGeocodingResponse[]> {
    const url = `${environment.openWeather.url}/geo/1.0/direct`;
    payload.appid = environment.openWeather.token;
    const params = this._buildHttpParams(payload);
    return this.httpClient.get<IGeocodingResponse[]>(url, { params: params });
  }

  public getWeatherInfo(payload: IForecastPayload): Observable<IForecastResponse> {
    const url = `${environment.openWeather.url}/data/3.0/onecall`;
    payload.appid = environment.openWeather.token;
    const params = this._buildHttpParams(payload);
    return this.httpClient.get<IForecastResponse>(url, { params: params }).pipe(take(1));
  }
}
