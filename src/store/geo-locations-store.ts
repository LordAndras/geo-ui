import {defineStore} from "pinia";
import {computed, ref, Ref} from "vue";
import {CenterLocation, GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {validate} from "../lib/utils/geo-location-validator.ts";

export const useGeoLocationsStore = defineStore('geoLocationsStore', () => {
    const locations: Ref<GeoLocation[] | null> = ref(null)
    const selectedLocation: Ref<GeoLocation | undefined> = ref(undefined)
    const validLocations = computed(() => {
        return locations.value?.filter(location => validate(location))
    })
    const invalidLocations = computed(() => {
        return locations.value?.filter(location => !validate(location))
    })
    const hasInvalidLocations = computed(() => {
        return !!invalidLocations.value && invalidLocations.value.length > 0
    })
    const centerLocation = computed((): CenterLocation => {
        let lon: number = 0
        let lat: number = 0
        validLocations.value?.forEach((location) => {
            lon += location.lon
            lat += location.lat
        })
        lon /= validLocations.value!.length
        lat /= validLocations.value!.length
        return { lat, lon, desc: "center" }
    })

    return {locations, selectedLocation, validLocations, invalidLocations, hasInvalidLocations, centerLocation}
})
