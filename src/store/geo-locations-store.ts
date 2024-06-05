import {defineStore} from "pinia";
import {computed, ref, Ref} from "vue";
import {CenterLocation, GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {validate} from "../lib/utils/geo-location-validator.ts";

export const useGeoLocationsStore = defineStore('geoLocationsStore', () => {
    const locations: Ref<GeoLocation[]> = ref([])
    const validLocations = computed(() => {
        return locations.value.filter(location => validate(location))
    })
    const invalidLocations = computed(() => {
        return locations.value.filter(location => !validate(location))
    })
    const hasInvalidLocations = computed(() => {
        return invalidLocations.value && invalidLocations.value.length > 0
    })
    const centerLocation = computed((): CenterLocation => {
        let lon: number = 0
        let lat: number = 0
        validLocations.value.forEach((location) => {
            lon += location.lon
            lat += location.lat
        })
        lon = (validLocations.value.length != 0) ? lon/validLocations.value.length : 19.2
        lat = (validLocations.value.length != 0) ? lat/validLocations.value.length : 47.3

        return { lat, lon, desc: "center" }
    })

    return {locations, validLocations, invalidLocations, hasInvalidLocations, centerLocation}
})
