import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';

import { IForecastPayload, IForecastResponse } from '../contracts/open-weather/IForecast';
import { OpenWeatherService } from '../services/open-weather.service';
import { SessionStorageService } from '../services/session-storage.service';
import { IGeocodingResponse } from '../contracts/open-weather/IGeocoding';

export const moreDaysForecastResolver: ResolveFn<IForecastResponse> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  let lat: number = Number(route.queryParamMap.get('lat'));
  let lon: number = Number(route.queryParamMap.get('lon'));
  const currentCityKey = inject(SessionStorageService).getItem('current_city');

  if (!!!lat || !!!lon) {
    if (!!!currentCityKey) {
      return of();
    } else {
      const currentCity = JSON.parse(currentCityKey) as IGeocodingResponse;
      lat = currentCity.lat;
      lon = currentCity.lon
    }
  }


  
  const request: IForecastPayload = {
    lat,
    lon,
    exclude: ['minutely', 'hourly'],
    units: 'metric',
  };
  
  return inject(OpenWeatherService).getWeatherInfo(request);
};
