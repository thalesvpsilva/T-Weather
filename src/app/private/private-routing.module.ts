import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WeatherComponent } from './weather/weather.component';
import { MoreDaysForecastComponent } from './more-days-forecast/more-days-forecast.component';
import { moreDaysForecastResolver } from '../shared/resolvers/more-days-forecast.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WeatherComponent
  },
  {
    path: 'forecast',
    component: MoreDaysForecastComponent,
    resolve: {forecast: moreDaysForecastResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
