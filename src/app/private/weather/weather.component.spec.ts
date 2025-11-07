import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { WeatherComponent } from './weather.component';
import { SessionStorageService } from './../../shared/services/session-storage.service';
import { IGeocodingResponse } from './../../shared/contracts/open-weather/IGeocoding';
import { Icon, IDescription, IForecastResponse, IMain } from './../../shared/contracts/open-weather/IForecast';
import { OpenWeatherService } from './../../shared/services/open-weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let mockOpenWeatherService: jest.Mocked<OpenWeatherService>;
  let mockSessionStorageService: jest.Mocked<SessionStorageService>;

  const mockForecastResponse: IForecastResponse = {
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

  beforeEach(() => {
    const mockGeocoding: IGeocodingResponse = {
      name: 'Dublin',
      lat: 53.3498006,
      lon: -6.2602964,
      country: "IE"
    };
    mockOpenWeatherService = {
      getWeatherInfo: jest.fn().mockReturnValue(new BehaviorSubject(mockForecastResponse))
    } as any;
    mockSessionStorageService = {
      setItem: jest.fn(),
      getItem: jest.fn().mockReturnValue(JSON.stringify(mockGeocoding)),
    } as any;

    TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [
        { provide: OpenWeatherService, useValue: mockOpenWeatherService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        provideRouter([])
      ]
    });
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cards component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.main-info')).toBeTruthy();
  });
});
