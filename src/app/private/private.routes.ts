import { Routes } from "@angular/router";

import { WeatherComponent } from "./weather/weather.component";
import { MoreDaysForecastComponent } from "./more-days-forecast/more-days-forecast.component";
import { moreDaysForecastResolver } from "../shared/resolvers/more-days-forecast.resolver";

export const PRIVATE_ROUTES: Routes = [
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
  ]