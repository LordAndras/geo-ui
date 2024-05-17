import {describe, expect, it} from "vitest";
import {GeoLocation} from "./geo-csv-parser.ts";
import {validate} from "./geo-location-validator.ts";

describe('GeoLocationValidator', () => {
    it('validate should return true for valid location', () => {
        const testLocation: GeoLocation = {
            lat: 24.3354,
            lon: -45.2354,
            alt: 32.4,
            rad: 15.0,
            description: 'testing',
            trigger: 'enter'
        }

        expect(validate(testLocation)).toEqual(true)
    })
    it('validate should return true for valid location with values at the limit', () => {
        const testLocation: GeoLocation = {
            lat: 90.000,
            lon: -180.000,
            alt: 32.4,
            rad: 15.0,
            description: 'testing',
            trigger: 'enter'
        }

        expect(validate(testLocation)).toEqual(true)
    })

    it('validate should return false for invalid location', () => {
        const testLocation: GeoLocation = {
            lat: 24.3354,
            lon: -405.2354,
            alt: 32.4,
            rad: 15.0,
            description: 'testing',
            trigger: 'enter'
        }

        expect(validate(testLocation)).toEqual(false)
    })
})