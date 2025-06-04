import 'dotenv/config'

export const environment = {
    openWeather: {
        url: 'https://api.openweathermap.org/',
        token: process.env.OPEN_WEATHER_TOKEN_DEV // A API Key must be generated at https://home.openweathermap.org/api_keys
    }
};