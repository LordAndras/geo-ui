import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";

export const useGeoLocationsStore = defineStore('geoLocationsStore', () => {
    const locations: Ref<GeoLocation[] | null> = ref(null)
    const invalidLocations: Ref<Geolocation[] | null> = ref(null)

    return { locations, invalidLocations }
})
