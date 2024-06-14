import {defineStore} from "pinia";
import {useGeoLocationsStore} from "./geo-locations-store.ts";
import {computed} from "vue";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import * as L from "leaflet";
import {Marker} from "leaflet";

export const useMapStore = defineStore('map-store', () => {
    const locationStore = useGeoLocationsStore()

    const markers = computed(() => {
        return locationStore.validLocations.map((location: GeoLocation) => {
            return L.marker([location.lat, location.lon], {title: location.desc})
                .bindTooltip(`<p>${location.desc}</p>`, {direction: "top"})
        })
    })

    function findMarkerForLocation(location: GeoLocation) {
        return markers.value.find((marker: Marker) => marker.options.title == location.desc)
    }

    return {markers, findMarkerForLocation}
})