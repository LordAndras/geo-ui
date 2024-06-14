<script setup lang="ts">
import TextInput from "./TextInput.vue";
import {computed} from "vue";
import {useSelectedLocationStore} from "../store/selected-location-store.ts";
import NumberInput from "./NumberInput.vue";
import {useGeoMarkerStore} from "../store/geo-marker-store.ts";

const selectedLocationStore = useSelectedLocationStore()
const geoMarkerStore = useGeoMarkerStore()
const editedLocation = computed(() => selectedLocationStore.selectedLocation)

const emits = defineEmits<{
  (event: 'onLocationSave'): void
  (event: 'onLocationDelete'): void
}>()

function updateModelText(event: { formId: string, value: string }) {
  if (event.formId == 'desc') {
    selectedLocationStore.editedLocation!.desc = event.value
  } else {
    selectedLocationStore.editedLocation!.trigger = event.value
  }
}

function updateModelNumber(event: { formId: string, value: number }) {
  switch (event.formId) {
    case 'lat':
      selectedLocationStore.editedLocation!.lat = event.value
      break
    case 'lon':
      selectedLocationStore.editedLocation!.lon = event.value
      break
    case 'alt':
      selectedLocationStore.editedLocation!.alt = event.value
      break
    case 'rad':
      selectedLocationStore.editedLocation!.rad = event.value
      break
  }
}

const onDialogOpen = () => {

}

const onImageDialogClose = () => {
  selectedLocationStore.resetStore()
}

function onCancel() {
}

function onSave() {
  emits('onLocationSave')
}

function onDeleteLocation() {
  emits('onLocationDelete')
}
</script>

<template>
  <e-dialog
      id="edit-location"
      headline="Location Editor"
      v-on="{
      'dialog.open': onDialogOpen,
      'dialog.close': onImageDialogClose
    }"
      no-close>
    <e-dialog-headline-slot>
      <button class="e-btn" data-action="close" :disabled="!geoMarkerStore.clickedMarker" @click="onDeleteLocation">Delete location</button>
    </e-dialog-headline-slot>
    <TextInput formId="desc"
               label="Description"
               :value="editedLocation?.desc"
               :disabled="false"
               @onValueChange="updateModelText"/>
    <NumberInput formId="lat"
                 label="Latitude"
                 :value="editedLocation?.lat"
                 type="number"
                 :disabled="false"
                 @onValueChange="updateModelNumber"/>
    <NumberInput formId="lon"
                 :value="editedLocation?.lon"
                 label="Longitude"
                 type="number"
                 :disabled="false"
                 @onValueChange="updateModelNumber"/>
    <NumberInput formId="alt"
                 :value="editedLocation?.alt"
                 label="Altitude"
                 type="number"
                 :disabled="false"
                 @onValueChange="updateModelNumber"/>
    <NumberInput formId="rad"
                 :value="editedLocation?.rad"
                 label="Radius"
                 :disabled="false"
                 type="number"
                 @onValueChange="updateModelNumber"/>
    <TextInput formId="trigger"
               :value="editedLocation?.trigger"
               label="Trigger"
               type="text"
               :disabled="false"
               @onValueChange="updateModelText"/>
    <e-dialog-footer>
      <e-dialog-footer-actions>
        <button class="e-btn e-btn-highlight" data-action="close" @click="onSave">Save</button>
        <button class="e-btn e-btn-borderless" data-action="close" @click="onCancel">Cancel</button>
      </e-dialog-footer-actions>
    </e-dialog-footer>
  </e-dialog>
</template>
