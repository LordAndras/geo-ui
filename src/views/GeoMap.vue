<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import {LeafletMouseEvent, Marker} from "leaflet"
import {computed, onMounted, ref, Ref} from "vue";
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {useSelectedLocationStore} from "../store/selected-location-store.ts";
import LocationEditorDialog from "../components/LocationEditorDialog.vue";
import {cloneDeep} from "lodash-es";

const initialMap: Ref<L.Map | null> = ref(null);
const locationStore = useGeoLocationsStore()
const selectedLocationStore = useSelectedLocationStore()
const markers = computed(() => {
  let result: Marker[] = []
  locationStore.validLocations.forEach((location: GeoLocation) => {
    result.push(L.marker([location.lat, location.lon]).on('click', selectLocation).bindTooltip(
        `<p>${location.desc}</p>`, {direction: "top"}))
  })
  return result
})
const clickedMarker: Ref<Marker | undefined> = ref()

function selectLocation(e: LeafletMouseEvent) {
  const clickedLocation = locationStore.validLocations.find((location: GeoLocation) =>
      location.lon == e.latlng.lng && location.lat == e.latlng.lat
  )
  selectedLocationStore.selectedLocation = cloneDeep(clickedLocation)
  selectedLocationStore.editedLocation = cloneDeep(clickedLocation)
  if (clickedLocation) {
    selectedLocationStore.selectedIndex = locationStore.locations.indexOf(clickedLocation) ?? -1
    clickedMarker.value = findMarker(clickedLocation)
  }
  document.getElementById('dialogOpener')?.click()
}

function findMarker(location: GeoLocation): Marker | undefined {
  return markers.value.find((marker: L.Marker) =>
      marker.getLatLng().lat == location.lat && marker.getLatLng().lng == location.lon
  )
}

function addMarkers() {
  if (initialMap.value) {
    markers.value.forEach((marker: Marker) => {
      marker.addTo(initialMap.value!)
    })
  }
}
//
// function addNewMarker(location: GeoLocation | undefined) {
//   if (initialMap.value && location) {
//     L.marker([location.lat, location.lon]).on('click', selectLocation).bindTooltip(
//         `<p>${location.desc}</p>`, {direction: "top"}).addTo(initialMap.value)
//   }
// }
//
// function removeMarker(location: GeoLocation | undefined) {
//   if (location && initialMap.value) {
//     const marker = markers.value.find((marker: L.Marker) =>
//         marker.getLatLng().lat == location.lat && marker.getLatLng().lng == location.lon
//     ) ?? L.marker([0, 0])
//     marker.removeFrom(initialMap.value)
//   }
// }

function updateMarker(location: GeoLocation | undefined) {
  if (clickedMarker.value && location) {
    clickedMarker.value.setLatLng([location.lat, location.lon]).setTooltipContent(`<p>${location.desc}</p>`)
  }
}

function updateSelectedLocation() {
  updateMarker(selectedLocationStore.editedLocation)
  locationStore.validLocations[selectedLocationStore.selectedIndex] = cloneDeep(selectedLocationStore.editedLocation!)
  selectedLocationStore.resetStore()
}

onMounted(() => {
  initialMap.value = L.map('map', {zoomControl: false}).setView([locationStore.centerLocation.lat, locationStore.centerLocation.lon], 7);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);
  addMarkers()
});
</script>

<template>
  <div id="map" style="height:50vh;"></div>
  <e-dialoghandler id="dialogOpener" dialog="#edit-location"></e-dialoghandler>
  <LocationEditorDialog @onLocationSave="updateSelectedLocation"/>
</template>

