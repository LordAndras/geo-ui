import Papa from 'papaparse';

export interface GeoLocation {
    lat: number,
    lon: number,
    alt: number,
    rad: number,
    trigger: string,
    description: string
}

export function parse(content: string): GeoLocation[] {
    return  Papa.parse<GeoLocation>(content, {
        header: true
    }).data
}
