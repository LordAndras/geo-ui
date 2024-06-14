import {defineStore} from "pinia";
import {useGeoLocationsStore} from "./geo-locations-store.ts";
import {computed, Ref} from "vue";
 import {Marker} from "leaflet";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import * as L from "leaflet";

export const useMapStore = defineStore('map-store', () => {
    const locationStore = useGeoLocationsStore()

    const markers: Ref<Marker[]> = computed(() => {
        return locationStore.validLocations.map((location: GeoLocation) => {
            return L.marker([location.lat, location.lon], {title: location.desc})
                .bindTooltip(`<p>${location.desc}</p>`, {direction: "top"})
        })
    })

    return {markers}
})