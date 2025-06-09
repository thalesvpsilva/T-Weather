import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrivateRoutingModule } from './private-routing.module';
import { WeatherComponent } from './weather/weather.component';


import { MoreDaysForecastComponent } from './more-days-forecast/more-days-forecast.component';


@NgModule({
    imports: [
    CommonModule,
    PrivateRoutingModule,
    RouterModule,
    WeatherComponent,
    MoreDaysForecastComponent
]
})
export class PrivateModule { }
