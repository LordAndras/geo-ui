<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import {Layer, LeafletMouseEvent, Marker} from "leaflet"
import {onMounted, ref, Ref} from "vue";
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {useSelectedLocationStore} from "../store/selected-location-store.ts";
import LocationEditorDialog from "../components/LocationEditorDialog.vue";
import {useGeoMarkerStore} from "../store/geo-marker-store.ts";
import {cloneDeep} from "lodash-es";
import {openDialog} from "../lib/dialog/dialog-opener.ts";
import {useMapStore} from "../store/map-store.ts";

const initialMap: Ref<L.Map | null> = ref(null);
const {
  locations,
  centerLocation,
  findLocationIndex,
  findLocationForClickedMarker,
  deleteLocation
} = useGeoLocationsStore()
const selectedLocationStore = useSelectedLocationStore()
const geoMarkerStore = useGeoMarkerStore()
const mapStore = useMapStore()

function selectLocation(event: LeafletMouseEvent) {
  selectedLocationStore.selectedLocation = findLocationForClickedMarker(event)
  selectedLocationStore.editedLocation = cloneDeep(selectedLocationStore.selectedLocation)
  if (selectedLocationStore.selectedLocation) {
    selectedLocationStore.selectedIndex = findLocationIndex(selectedLocationStore.selectedLocation)
    geoMarkerStore.clickedMarker = mapStore.findMarkerForLocation(selectedLocationStore.selectedLocation)
  }
  openDialog('dialogOpener')
}

function addMarkers() {
  if (initialMap.value) {
    mapStore.markers.forEach((marker: Marker) => {
      marker.on('click', selectLocation)
      initialMap.value?.addLayer(marker)
    })
  }
}

function addNewMarker(event: LeafletMouseEvent) {
  const newLocation: GeoLocation = {
    alt: 0, desc: "New location", lat: event.latlng.lat, lon: event.latlng.lng, rad: 250, trigger: "ENTER"
  }
  selectedLocationStore.selectedLocation = newLocation
  selectedLocationStore.editedLocation = cloneDeep(newLocation)
  openDialog('dialogOpener')
}

function removeLocationMarker() {
  if (initialMap.value) {
    initialMap.value.eachLayer((layer: Layer) => {
      if (layer instanceof Marker && layer.options.title == geoMarkerStore.clickedMarker?.options.title) {
        initialMap.value?.removeLayer(layer)
      }
    })
  }
}

function updateMarker(location: GeoLocation) {
  removeLocationMarker()
  if (initialMap.value) {
    L.marker([location.lat, location.lon], {title: location.desc})
        .bindTooltip(`<p>${location.desc}</p>`)
        .on('click', selectLocation)
        .addTo(initialMap.value)
  }
  geoMarkerStore.clickedMarker = undefined
}

function upsertLocation(location: GeoLocation) {
  if (selectedLocationStore.selectedIndex === -1) {
    locations.push(location)
  } else {
    locations[selectedLocationStore.selectedIndex] = location
  }
}

function onLocationSaved() {
  if (selectedLocationStore.editedLocation) {
    updateMarker(selectedLocationStore.editedLocation)
    upsertLocation(selectedLocationStore.editedLocation)
    selectedLocationStore.resetStore()
    geoMarkerStore.clickedMarker = undefined
  }
}

function onLocationDeleted() {
  if (selectedLocationStore.selectedLocation) {
    deleteMarker()
    deleteLocation(selectedLocationStore.selectedLocation.desc)
    selectedLocationStore.resetStore()
    geoMarkerStore.clickedMarker = undefined
  }
}

function deleteMarker() {
  if (geoMarkerStore.clickedMarker && initialMap.value) {
    initialMap.value.eachLayer((layer: Layer) => {
      if (layer instanceof Marker && layer.options.title == geoMarkerStore.clickedMarker?.options.title) {
        initialMap.value?.removeLayer(layer)
      }
    })
  }
}

onMounted(() => {
  initialMap.value = L.map('map', {zoomControl: false}).setView([centerLocation.lat, centerLocation.lon], 7)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);
  addMarkers()
  initialMap.value.on('click', (event: LeafletMouseEvent) => {
    addNewMarker(event)
  })
})
</script>

<template>
  <div id="map" style="height:50vh;"></div>
  <e-dialoghandler id="dialogOpener" dialog="#edit-location"></e-dialoghandler>
  <LocationEditorDialog @onLocationSave="onLocationSaved" @onLocationDelete="onLocationDeleted"/>
</template>

