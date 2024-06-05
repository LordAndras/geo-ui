import {defineStore} from "pinia";
import {ref, Ref} from "vue";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";

export const useSelectedLocationStore = defineStore('selected-location', () => {
    const selectedLocation: Ref<GeoLocation | undefined> = ref(undefined)
    const selectedIndex = ref(-1)

    return {selectedLocation, selectedIndex}
})