import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { moreDaysForecastResolver } from './more-days-forecast.resolver';
import { IForecastResponse } from '../contracts/open-weather/IForecast';

describe('moreDaysForecastResolver', () => {
  const executeResolver: ResolveFn<IForecastResponse> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => moreDaysForecastResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
