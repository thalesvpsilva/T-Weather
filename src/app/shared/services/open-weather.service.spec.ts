import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpParams, provideHttpClient } from '@angular/common/http';

import { OpenWeatherService } from './open-weather.service';
import { environment } from './../../../environments/environment.development';
import { IGeocodingPayload, IGeocodingResponse } from '../contracts/open-weather/IGeocoding';
import { Icon, IDescription, IForecastPayload, IForecastResponse, IMain } from '../contracts/open-weather/IForecast';

describe('OpenWeatherService', () => {
  let service: OpenWeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(OpenWeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.getGeocoding', () => {
    const mockPayload: IGeocodingPayload = {
      q: 'dubl',
      limit: 5,
      appid: ''
    };
    const mockResponse: IGeocodingResponse[] = [
      {
        name: 'Dublin',
        lat: 53.3498006,
        lon: -6.2602964,
        country: "IE"
      },
      {
        name: 'Dublin',
        lat: 37.7021521,
        lon: -121.9357918,
        country: "US",
        state: "California"
      },
      {
        name: 'Dublin',
        lat: 32.5404447,
        lon: -82.903754,
        country: "US",
        state: "Georgia"
      },
    ];
    const params = Object.entries(mockPayload)
      .reduce((params, [key, value]) => params.set(key, value), new HttpParams());
    const mockUrl = `${environment.openWeather.url}/geo/1.0/direct?${params.toString()}`;

    it('should make GET request and return data', () => {
      service.getGeocoding(mockPayload).subscribe(data => {
        expect(data).toEqual(mockResponse)
      });

      const req = httpMock.expectOne(mockUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });

    it('should handle GET errors', () => {
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getGeocoding(mockPayload).subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toEqual(mockError.status);
        }
      });

      const req = httpMock.expectOne(mockUrl);
      req.flush(null, mockError);
    });
  }); 

  describe('.getWeatherInfo', () => {
    const mockPayload: IForecastPayload = {
      lat: 31.2006152,
      lon: 74.7889137,
      exclude: ['minutely', 'daily'],
      units: 'metric',
      appid: ''
    };
    const mockResponse: IForecastResponse = {
      "lat": 31.2006,
      "lon": 74.7889,
      "timezone": "Asia/Kolkata",
      "timezone_offset": 19800,
      "current": {
          "dt": 1762536936,
          "sunrise": 1762478468,
          "sunset": 1762517275,
          "temp": 18.4,
          "feels_like": 16.82,
          "pressure": 1015,
          "humidity": 20,
          "dew_point": -4.38,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 0.97,
          "wind_deg": 351,
          "wind_gust": 1.01,
          "weather": [
              {
                  "id": 800,
                  "main": IMain.Clear,
                  "description": IDescription.ClearSky,
                  "icon": Icon.Icon01N
              }
          ]
      },
      "hourly": [
          {
              "dt": 1762534800,
              "temp": 18.53,
              "feels_like": 16.93,
              "pressure": 1015,
              "humidity": 19,
              "dew_point": -4.89,
              "uvi": 0,
              "clouds": 0,
              "visibility": 10000,
              "wind_speed": 1.04,
              "wind_deg": 356,
              "wind_gust": 1.02,
              "weather": [
                {
                    "id": 800,
                    "main": IMain.Clear,
                    "description": IDescription.ClearSky,
                    "icon": Icon.Icon01N
                }
              ],
              "pop": 0
          }
        ]
    };
    const params = Object.entries(mockPayload)
      .reduce((params, [key, value]) => params.set(key, value), new HttpParams());

    const mockUrl = `${environment.openWeather.url}/data/3.0/onecall?${params.toString()}`;

    it('should make GET request and return data', () => {
      service.getWeatherInfo(mockPayload).subscribe(data => {
        expect(data).toEqual(mockResponse)
      });

      const req = httpMock.expectOne(mockUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });

    it('should handle GET errors', () => {
      const mockError = { status: 404, statusText: 'Not Found' };

      service.getWeatherInfo(mockPayload).subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toEqual(mockError.status);
        }
      });

      const req = httpMock.expectOne(mockUrl);
      req.flush(null, mockError);
    });
  }); 
});
