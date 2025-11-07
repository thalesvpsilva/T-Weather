import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { SearchInputComponent } from './search-input.component';
import { OpenWeatherService } from '../../services/open-weather.service';
import { IGeocodingResponse } from '../../contracts/open-weather/IGeocoding';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let mockOpenWeatherService: jest.Mocked<OpenWeatherService>;

  const mockGeocodingResponse: IGeocodingResponse[] = [
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

  beforeEach(() => {
    mockOpenWeatherService = {
      getGeocoding: jest.fn().mockReturnValue(new BehaviorSubject(mockGeocodingResponse))
    } as any;

    TestBed.configureTestingModule({
      imports: [SearchInputComponent, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: OpenWeatherService, useValue: mockOpenWeatherService },
        { provide: FormBuilder }
      ]
    });
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form.search-form');

    expect(form).toBeTruthy();
    expect(form?.querySelector('input')).toBeTruthy();
  });

  it('should fetch geocoding data', async () => {
    const filterSpy = jest.spyOn(mockOpenWeatherService, 'getGeocoding');
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector('form.search-form')?.querySelector('input') as HTMLInputElement;

    searchInput.value = 'dubl';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await setTimeout(() => {
      expect(filterSpy).toHaveBeenCalled();
    }, 1000);
  });
});