import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete, MatOption, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIcon } from '@angular/material/icon';

import { IGeocodingPayload, IGeocodingResponse } from '../../contracts/open-weather/IGeocoding';
import { OpenWeatherService } from '../../services/open-weather.service';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    imports: [FormsModule, MatFormField, MatLabel, MatInput, MatAutocompleteTrigger, ReactiveFormsModule, MatIcon, MatSuffix, MatAutocomplete, MatOption, AsyncPipe]
})
export class SearchInputComponent implements OnInit {
  
  private readonly _openWeatherService = inject(OpenWeatherService);

  public searchControl = new FormControl<string | IGeocodingResponse>('');
  public options?: IGeocodingResponse[];
  public filteredOptions$?: Observable<IGeocodingResponse[]>;
  public valueSelected = output<IGeocodingResponse>();

  constructor() {}

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
  }

  public locationDesc(option: IGeocodingResponse): string {
    if (!option) {
      return '';
    }
    
    return `${option.name}${option.state ? ', ' + option.state : ''}, ${ option.country }`;    
  }

  public optionSelected = (selected: MatAutocompleteSelectedEvent): void =>
    this.valueSelected.emit(selected.option.value);

  private _filter(value: string): Observable<IGeocodingResponse[]> {
    const geocodingPayload: IGeocodingPayload = {
      q: value,
      limit: 5
    }; 
    
    return this._openWeatherService.getGeocoding(geocodingPayload);
  }
}
