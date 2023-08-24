import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrivateRoutingModule } from './private-routing.module';
import { WeatherComponent } from './weather/weather.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { MoreDaysForecastComponent } from './more-days-forecast/more-days-forecast.component';


@NgModule({
  declarations: [
    WeatherComponent,
    MoreDaysForecastComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    RouterModule,
    CoreModule,
    SharedModule
  ]
})
export class PrivateModule { }
