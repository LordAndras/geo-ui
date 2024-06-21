<script setup lang="ts">

import {editorSteps} from "./lib/constants/steps.ts";
import {ref} from "vue";
import {cloneDeep} from "lodash-es";
import GeolocationUpload from "./views/GeolocationUpload.vue";
import GeolocationList from "./views/GeolocationList.vue";
import GeoMap from "./views/GeoMap.vue";
import {useGeoCsvStore} from "./store/geo-csv-store.ts";
import MainHeader from "./components/MainHeader.vue";
import TextInput from "./components/TextInput.vue";
import {LocationOption, locationOptions} from "./lib/constants/LocationListFilter.ts";
import FinalizeUpload from "./views/FinalizeUpload.vue";

const fileStore = useGeoCsvStore()
const steps = ref(cloneDeep(editorSteps))
const selectedOption = ref(locationOptions[0])

function goToStep(index: number) {
  steps.value.forEach((step) => {
    step.selected = index === step.index
  })
}

function onOptionChanged(event: { detail: { value: string } }) {
  locationOptions.forEach((option: LocationOption) => option.isSelected = option.value == event.detail.value)
  selectedOption.value = locationOptions.find((option: LocationOption) => option.value == event.detail.value) ?? locationOptions[0]
}
</script>

<template>
  <MainHeader>
    <section v-if="steps[0].selected" class="e-layout__section e-padding-l">
      <GeolocationUpload :is-valid="fileStore.isValid"/>
    </section>
    <section v-if="steps[1].selected" class="e-layout__content e-padding-l">
      <div class="e-layout__section e-layout__section-sidebar e-padding-l">
        <div class="e-section__header">
          <div class="e-section__title">Geolocations</div>
        </div>
        <div class="e-section__content">
          <e-select id="locationFilter" placeholder="Select filter option" @change="onOptionChanged">
            <e-select-option v-for="option in locationOptions"
                             :key="option.value"
                             :value="option.value"
                             :selected="option.isSelected">
              {{ option.label }}
            </e-select-option>
          </e-select>
        </div>
        <div class="e-section__content">
          <GeolocationList :locationOption="selectedOption.value"/>
        </div>
      </div>
      <section class="e-layout__section e-padding-l">
        <div class="e-section__header">
          <div class="e-section__title">Edit geolocations</div>
        </div>
        <div class="e-section__content">
          <TextInput form-id="address" label="Search location" :disabled="false"/>
          <GeoMap/>
        </div>
      </section>
    </section>
    <section v-if="steps[2].selected" class="e-layout__section e-padding-l">
      <FinalizeUpload/>
    </section>
    <e-step-bar floating>
      <e-step v-for="step in steps" :key="step.toString()" :label="step.label" :disabled="!fileStore.isValid"
              @trigger="goToStep(step.index)"
              :selected="`${step.selected}`"></e-step>
    </e-step-bar>
  </MainHeader>
</template>
