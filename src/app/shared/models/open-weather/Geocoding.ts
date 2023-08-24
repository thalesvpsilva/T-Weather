import { IGeocodingResponse } from "../../contracts/open-weather/IGeocoding";

export class GeocodingResponse implements IGeocodingResponse {

    constructor(
        public name: string,
        public lat: number,
        public lon: number,
        public country: string,
        public state?: string
    ) {}

    public description(): string {
        return `${this.name}${this.state ? ', ' + this.state : ''}, ${this.country}`;
    }
}