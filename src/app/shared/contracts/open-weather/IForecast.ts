export interface IForecastPayload {
    lat: number;
    lon: number;
    exclude?: string[];
    units?: string;
    appid?: string;
}

export interface IForecastResponse {
    lat:             number;
    lon:             number;
    timezone:        string;
    timezone_offset: number;
    current:         ICurrent;
    minutely:        IMinutely[];
    hourly:          ICurrent[];
    daily:           IDaily[];
}

export interface ICurrent {
    dt:         number;
    sunrise?:   number;
    sunset?:    number;
    temp:       number;
    feels_like: number;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    uvi:        number;
    clouds:     number;
    visibility: number;
    wind_speed: number;
    wind_deg:   number;
    weather:    IWeather[];
    wind_gust?: number;
    pop?:       number;
}

export interface IWeather {
    id:          number;
    main:        IMain;
    description: IDescription;
    icon:        Icon;
}

export enum IDescription {
    BrokenClouds = "broken clouds",
    ClearSky = "clear sky",
    FewClouds = "few clouds",
    LightRain = "light rain",
    OvercastClouds = "overcast clouds",
    ScatteredClouds = "scattered clouds",
}

export enum Icon {
    Icon01D = "01d",
    Icon01N = "01n",
    Icon02D = "02d",
    Icon02N = "02n",
    Icon03D = "03d",
    Icon03N = "03n",
    Icon04D = "04d",
    Icon04N = "04n",
    Icon09D = "09d",
    Icon09N = "09n",
    Icon10D = "10d",
    Icon10N = "10n",
    Icon11D = "11d",
    Icon11N = "11n",
    Icon13D = "13d",
    Icon13N = "13n",
    Icon50D = "50d",
    Icon50N = "50n",
}

export enum IMain {
    Clear = "Clear",
    Clouds = "Clouds",
    Rain = "Rain",
}

export interface IDaily {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    moonrise:   number;
    moonset:    number;
    moon_phase: number;
    summary:    string;
    temp:       ITemp;
    feels_like: IFeelsLike;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    IWeather[];
    clouds:     number;
    pop:        number;
    uvi:        number;
    rain?:      number;
}

export interface IFeelsLike {
    day:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface ITemp {
    day:   number;
    min:   number;
    max:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface IMinutely {
    dt:            number;
    precipitation: number;
}
