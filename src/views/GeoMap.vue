<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import {Layer, LeafletMouseEvent, Marker} from "leaflet"
import {computed, onMounted, ref, Ref} from "vue";
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {useSelectedLocationStore} from "../store/selected-location-store.ts";
import LocationEditorDialog from "../components/LocationEditorDialog.vue";
import {useGeoMarkerStore} from "../store/geo-marker-store.ts";
import {cloneDeep} from "lodash-es";

const initialMap: Ref<L.Map | null> = ref(null);
const locationStore = useGeoLocationsStore()
const selectedLocationStore = useSelectedLocationStore()
const geoMarkerStore = useGeoMarkerStore()
const markers = computed(() => {
  let result: Marker[] = []
  locationStore.validLocations.forEach((location: GeoLocation) => {
    result.push(L.marker([location.lat, location.lon], {title: location.desc}).on('click', selectLocation).bindTooltip(
        `<p>${location.desc}</p>`, {direction: "top"}))
  })
  return result
})

function selectLocation(e: LeafletMouseEvent) {
  selectedLocationStore.selectedLocation = locationStore.locations.find((location: GeoLocation) =>
      location.lon == e.latlng.lng && location.lat == e.latlng.lat
  )
  selectedLocationStore.editedLocation = cloneDeep(selectedLocationStore.selectedLocation)
  if (selectedLocationStore.selectedLocation) {
    selectedLocationStore.selectedIndex = locationStore.locations.indexOf(selectedLocationStore.selectedLocation) ?? -1
    geoMarkerStore.clickedMarker = findMarker(selectedLocationStore.selectedLocation)
  }
  document.getElementById('dialogOpener')?.click()
}

function findMarker(location: GeoLocation): Marker | undefined {
  let marker: Marker | undefined
  initialMap.value!.eachLayer((layer: Layer) => {
    if (layer instanceof Marker && layer.options.title == location.desc) {
      marker = layer
    }
  })
  return marker
}

function addMarkers() {
  if (initialMap.value) {
    markers.value.forEach((marker: Marker) => {
      marker.addTo(initialMap.value!)
    })
  }
}

function updateMarker(location: GeoLocation | undefined) {
  if (geoMarkerStore.clickedMarker && location) {
    geoMarkerStore.clickedMarker.setLatLng([location.lat, location.lon]).setTooltipContent(`<p>${location.desc}</p>`).closePopup()
  }
  geoMarkerStore.clickedMarker = undefined
}

function updateSelectedLocation() {
  updateMarker(selectedLocationStore.editedLocation)
  locationStore.locations[selectedLocationStore.selectedIndex] = selectedLocationStore.editedLocation!
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

