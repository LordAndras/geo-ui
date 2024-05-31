import Papa from 'papaparse';

export interface GeoLocation {
    lat: number,
    lon: number,
    alt: number,
    rad: number,
    trigger: string,
    desc: string
}

export interface CenterLocation {
    lat: number,
    lon: number,
    desc: string
}

export function parse(content: string): GeoLocation[] {
    return  Papa.parse<GeoLocation>(content, {
        header: true,
        dynamicTyping: true
    }).data
}
