export interface IGeocodingPayload {
    q: string;
    limit?: number;
    appid?: string;
}

export interface IGeocodingResponse {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}