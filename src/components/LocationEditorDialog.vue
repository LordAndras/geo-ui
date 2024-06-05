<script setup lang="ts">
import TextInput from "./TextInput.vue";
import {ref} from "vue";
import {useSelectedLocationStore} from "../store/selected-location-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import NumberInput from "./NumberInput.vue";

const selectedLocationStore = useSelectedLocationStore()
const isEditorDisabled = ref(true)

const lat = ref(selectedLocationStore.selectedLocation?.lat ?? 0)
const lon = ref(selectedLocationStore.selectedLocation?.lon ?? 0)
const alt = ref(selectedLocationStore.selectedLocation?.alt ?? 0)
const rad = ref(selectedLocationStore.selectedLocation?.rad ?? 0)
const trigger = ref(selectedLocationStore.selectedLocation?.trigger ?? '')
const desc = ref(selectedLocationStore.selectedLocation?.desc ?? '')

const emits = defineEmits<{
  (event: 'onLocationSave', location: GeoLocation): void
}>()

function enableEditor() {
  isEditorDisabled.value = false
}

function updateModelText(event: { formId: string, value: string }) {
  if (event.formId == 'desc') {
    desc.value = event.value
  } else {
    trigger.value = event.value
  }
}

function updateModelNumber(event: { formId: string, value: number }) {
  switch (event.formId) {
    case 'lat':
      lat.value = event.value
      break
    case 'lon':
      lon.value = event.value
      break
    case 'alt':
      alt.value = event.value
      break
    case 'rad':
      rad.value = event.value
      break
  }
}

const onDialogOpen = () => {
  lat.value = selectedLocationStore.selectedLocation?.lat ?? 0
  lon.value = selectedLocationStore.selectedLocation?.lon ?? 0
  alt.value = selectedLocationStore.selectedLocation?.alt ?? 0
  rad.value = selectedLocationStore.selectedLocation?.rad ?? 0
  trigger.value = selectedLocationStore.selectedLocation?.trigger ?? ''
  desc.value = selectedLocationStore.selectedLocation?.desc ?? ''
}

const onImageDialogClose = () => {
  lat.value = 0
  lon.value = 0
  alt.value = 0
  rad.value = 0
  trigger.value = ''
  desc.value = ''
  isEditorDisabled.value = true
}

function onCancel() {
  isEditorDisabled.value = true
}

function onSave() {
  emits('onLocationSave', {
    lat: Number(lat.value ?? 0),
    lon: Number(lon.value ?? 0),
    alt: Number(alt.value ?? 0),
    rad: Number(rad.value ?? 0),
    trigger: trigger.value ?? '',
    desc: desc.value ?? ''
  })
  isEditorDisabled.value = true
}
</script>

<template>
  <e-dialog
      id="edit-location"
      headline="Dialog Title"
      v-on="{
      'dialog.open': onDialogOpen,
      'dialog.close': onImageDialogClose
    }"
      no-close>
    <e-dialog-headline-slot>
      <button class="e-btn" @click="enableEditor">Enable editing</button>
    </e-dialog-headline-slot>
    <TextInput formId="desc"
               label="Description"
               :value="desc"
               :disabled="isEditorDisabled"
               @onValueChange="updateModelText"/>
    <NumberInput formId="lat"
                 label="Latitude"
                 :value="lat"
                 type="number"
                 :disabled="isEditorDisabled"
                 @onValueChange="updateModelNumber"/>
    <NumberInput formId="lon"
                 :value="lon"
                 label="Longitude"
                 type="number"
                 :disabled="isEditorDisabled"
                 @onValueChange="updateModelNumber"/>
    <NumberInput formId="alt"
                 :value="alt"
                 label="Altitude"
                 type="number"
                 :disabled="isEditorDisabled"
                 @onValueChange="updateModelNumber"/>
    <NumberInput formId="rad"
                 :value="rad"
                 label="Radius"
                 :disabled="isEditorDisabled"
                 type="number"
                 @onValueChange="updateModelNumber"/>
    <TextInput formId="trigger"
               :value="trigger"
               label="Trigger"
               type="text"
               :disabled="isEditorDisabled"
               @onValueChange="updateModelText"/>
    <e-dialog-footer>
      <e-dialog-footer-actions>
        <button class="e-btn e-btn-highlight" data-action="close" @click="onSave">Save</button>
        <button class="e-btn e-btn-borderless" data-action="close" @click="onCancel">Cancel</button>
      </e-dialog-footer-actions>
    </e-dialog-footer>
  </e-dialog>
</template>
