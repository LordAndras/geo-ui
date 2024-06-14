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
import {openDialog} from "../lib/dialog/dialog-opener.ts";

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
  openDialog('dialogOpener')
}

function findMarker(location: GeoLocation): Marker | undefined {
  return markers.value.find((marker: Marker) => marker.options.title == location.desc)
}

function addMarkers() {
  if (initialMap.value) {
    markers.value.forEach((marker: Marker) => {
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

function updateMarker(location: GeoLocation) {
  if (geoMarkerStore.clickedMarker && initialMap.value) {
    initialMap.value.eachLayer((layer: Layer) => {
      if (layer instanceof Marker && layer.options.title == geoMarkerStore.clickedMarker?.options.title) {
        initialMap.value?.removeLayer(layer)
      }
    })
    L.marker([location.lat, location.lon], {title: location.desc}).bindTooltip(`<p>${location.desc}</p>`).on('click', selectLocation).addTo(initialMap.value)
  } else if (initialMap.value) {
    L.marker([location.lat, location.lon], {title: location.desc}).bindTooltip(`<p>${location.desc}</p>`).on('click', selectLocation).addTo(initialMap.value)
  }
  geoMarkerStore.clickedMarker = undefined
}

function updateSelectedLocation() {
  if (selectedLocationStore.editedLocation) {
    updateMarker(selectedLocationStore.editedLocation)
    if (selectedLocationStore.selectedIndex === -1) {
      locationStore.locations.push(selectedLocationStore.editedLocation)
    } else {
      locationStore.locations[selectedLocationStore.selectedIndex] = selectedLocationStore.editedLocation
    }
  }
  selectedLocationStore.resetStore()
  geoMarkerStore.clickedMarker = undefined
}

function deleteSelectedLocation() {
  if (selectedLocationStore.editedLocation) {
    if (geoMarkerStore.clickedMarker && initialMap.value) {
      initialMap.value.eachLayer((layer: Layer) => {
        if (layer instanceof Marker && layer.options.title == geoMarkerStore.clickedMarker?.options.title) {
          initialMap.value?.removeLayer(layer)
        }
      })
    }
    locationStore.locations = locationStore.locations.filter((location: GeoLocation) =>
        location.desc != selectedLocationStore.editedLocation?.desc
    )
  }
  selectedLocationStore.resetStore()
  geoMarkerStore.clickedMarker = undefined
}

onMounted(() => {
  initialMap.value = L.map('map', {zoomControl: false}).setView([locationStore.centerLocation.lat, locationStore.centerLocation.lon], 7);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);
  addMarkers()
  initialMap.value.on('click', (event: LeafletMouseEvent) => {
    addNewMarker(event)
  })
});
</script>

<template>
  <div id="map" style="height:50vh;"></div>
  <e-dialoghandler id="dialogOpener" dialog="#edit-location"></e-dialoghandler>
  <LocationEditorDialog @onLocationSave="updateSelectedLocation" @onLocationDelete="deleteSelectedLocation"/>
</template>

