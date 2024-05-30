import {defineStore} from "pinia";
import {computed, ref, Ref} from "vue";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {validate} from "../lib/utils/geo-location-validator.ts";

export const useGeoLocationsStore = defineStore('geoLocationsStore', () => {
    const locations: Ref<GeoLocation[] | null> = ref(null)
    const invalidLocations = computed(() => {
        return locations.value?.filter(location => !validate(location))
    })
    const hasInvalidLocations = computed(() => {
        return !!invalidLocations.value && invalidLocations.value.length > 0
    })

    return {locations, invalidLocations, hasInvalidLocations}
})
