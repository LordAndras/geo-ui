import {defineStore} from "pinia";
import {computed, ref, Ref} from "vue";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {Marker} from "leaflet";
import {useGeoLocationsStore} from "./geo-locations-store.ts";

export const useGeoMarkerStore = defineStore('geoMarkerStore', () => {
    const locationStore = useGeoLocationsStore()

    const locations: Ref<GeoLocation[]> = computed(() => locationStore.locations)
    const clickedMarker: Ref<Marker | undefined> = ref()

    return { locations, clickedMarker }
})