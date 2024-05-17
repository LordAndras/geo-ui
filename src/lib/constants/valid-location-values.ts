export interface LatLongValueRanges {
    maxValue: number,
    minValue: number,
}

export const latitude: LatLongValueRanges = {
    maxValue: 90.0,
    minValue: -90.0
}

export const longitude: LatLongValueRanges = {
    maxValue: 180.0,
    minValue: -180.0
}