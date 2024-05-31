<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import {LeafletMouseEvent} from "leaflet"
import {onMounted, ref, Ref} from "vue";
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import TextInput from "../components/TextInput.vue";

const initialMap: Ref<L.Map | null> = ref(null);
const locationStore = useGeoLocationsStore()
const isEditorDisabled = ref(true)

function enableEditor() {
  isEditorDisabled.value = false
}

function selectLocation(e: LeafletMouseEvent) {
  locationStore.selectedLocation = locationStore.locations?.find((location: GeoLocation) =>
      location.lon == e.latlng.lng && location.lat == e.latlng.lat
  )
}

function onCancel() {
  isEditorDisabled.value = true
}

function onSave() {
  window.alert('stuff saved')
  isEditorDisabled.value = true
}

function addMarkers() {
  locationStore.validLocations?.forEach((location: GeoLocation) => {
    if (initialMap.value) {
      L.marker([location.lat, location.lon]).on('click', selectLocation).bindPopup(
          `<e-dialoghandler dialog="#edit-location"><p>${location.desc}</p></e-dialoghandler>`
      ).addTo(initialMap.value)
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
  <e-dialog id="edit-location" headline="Dialog Title" no-close>
    <e-dialog-headline-slot>
      <button class="e-btn" @click="enableEditor">Enable editing</button>
    </e-dialog-headline-slot>
    <TextInput label="Description" :value="locationStore.selectedLocation?.desc" :disabled="isEditorDisabled" />
    <TextInput label="Latitude" :value="locationStore.selectedLocation?.lat" :disabled="isEditorDisabled"/>
    <TextInput label="Longitude" :value="locationStore.selectedLocation?.lon" :disabled="isEditorDisabled"/>
    <TextInput label="Altitude" :value="locationStore.selectedLocation?.alt" :disabled="isEditorDisabled"/>
    <TextInput label="Radius" :value="locationStore.selectedLocation?.rad" :disabled="isEditorDisabled"/>
    <TextInput label="Trigger" :value="locationStore.selectedLocation?.trigger" :disabled="isEditorDisabled"/>
    <e-dialog-footer>
      <e-dialog-footer-actions>
        <button class="e-btn e-btn-highlight" @click="onSave">Save</button>
        <button class="e-btn e-btn-borderless" data-action="close" @click="onCancel">Cancel</button>
      </e-dialog-footer-actions>
    </e-dialog-footer>
  </e-dialog>
</template>

