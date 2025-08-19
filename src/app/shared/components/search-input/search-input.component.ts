import { Component, OnDestroy, OnInit, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs';

import { IGeocodingResponse } from '../../contracts/open-weather/IGeocoding';
import { OpenWeatherService } from '../../services/open-weather.service';
import { IGeocodingPayload } from '../../contracts/open-weather/IGeocoding';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete, MatOption } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatAutocompleteTrigger, ReactiveFormsModule, MatIcon, MatSuffix, MatAutocomplete, MatOption, AsyncPipe]
})
export class SearchInputComponent implements OnInit, OnDestroy {
  
  private readonly _onDestroy$ = new Subject<void>();

  public searchControl = new FormControl<string | IGeocodingResponse>('');
  public options?: IGeocodingResponse[];
  public filteredOptions$?: Observable<IGeocodingResponse[]>;
  public valueSelected = output<IGeocodingResponse>();

  constructor(
    private _openWeatherService: OpenWeatherService
  ) {}

  ngOnInit(): void {
    this.filteredOptions$ = 
    this.searchControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value.trim() : ''),
        filter(value => value.length >= 3),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => this._filter(value)),
        filter(forecast => !!forecast.length)
      );

    this.searchControl.valueChanges
      .pipe(
        filter(value => typeof value === 'object'),
        distinctUntilChanged(),
        takeUntil(this._onDestroy$)
      )
      .subscribe(value => this.valueSelected.emit(value as IGeocodingResponse));
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  public locationDesc(option: IGeocodingResponse): string {
    if (!option) {
      return '';
    }
    
    return `${option.name}${option.state ? ', ' + option.state : ''}, ${ option.country }`;    
  }

  private _filter(value: string): Observable<IGeocodingResponse[]> {
    const geocodingPayload: IGeocodingPayload = {
      q: value,
      limit: 5
    }; 
    

    return this._openWeatherService.getGeocoding(geocodingPayload);
  }
}
