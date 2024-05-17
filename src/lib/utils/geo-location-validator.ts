import {GeoLocation} from "./geo-csv-parser.ts";
import {latitude, longitude} from "../constants/valid-location-values.ts";

export function validate(location: GeoLocation): boolean {
    return validateLatitude(location.lat) && validateLongitude(location.lon)
}

function validateLatitude(value: number): boolean {
    return value >= latitude.minValue && value <= latitude.maxValue
}

function validateLongitude(value: number): boolean {
    return value >= longitude.minValue && value <= longitude.maxValue
}