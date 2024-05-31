<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import {onMounted, ref, Ref} from "vue";
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";

const initialMap: Ref<L.Map | null> = ref(null);
const locationStore = useGeoLocationsStore()

function addMarkers() {
  locationStore.validLocations?.forEach((location: GeoLocation) => {
    if (initialMap.value) {
      L.marker([location.lat, location.lon]).addTo(initialMap.value)
    }
  })
}

onMounted(() => {
  initialMap.value = L.map('map').setView([locationStore.centerLocation.lat, locationStore.centerLocation.lon], 7);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);
  addMarkers()
});
</script>

<template>
  <div id="map" style="height:50vh;"></div>
</template>

