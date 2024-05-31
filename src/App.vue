<script setup lang="ts">

import {editorSteps} from "./lib/constants/steps.ts";
import {ref} from "vue";
import {cloneDeep} from "lodash-es";
import GeolocationUpload from "./views/GeolocationUpload.vue";
import GeolocationList from "./views/GeolocationList.vue";
import GeoMap from "./views/GeoMap.vue";
import {useGeoCsvStore} from "./store/geo-csv-store.ts";
import MainHeader from "./components/MainHeader.vue";

const steps = ref(cloneDeep(editorSteps))

function goToStep(index: number) {
  steps.value.forEach((step) => {
    step.selected = index === step.index
  })
}

const fileStore = useGeoCsvStore()

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
          <GeolocationList/>
        </div>
      </div>
      <section class="e-layout__section e-padding-l">
        <div class="e-section__header">
          <div class="e-section__title">Edit geolocations</div>
        </div>
        <div class="e-section__content">
          <GeoMap/>
        </div>
      </section>
    </section>
    <section v-if="steps[2].selected" class="e-layout__section e-padding-l">
      <div class="e-section__header">
        <div class="e-section__title">Finalize</div>
      </div>
      <div class="e-section__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis odio sequi
        consectetur perspiciatis, voluptate! Quasi velit ad, mollitia maxime doloribus est! Asperiores cupiditate
        illum non distinctio deleniti dolorem impedit. Eum. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit.
      </div>
    </section>
    <e-step-bar floating>
      <e-step v-for="step in steps" :key="step.toString()" :label="step.label" :disabled="!fileStore.isValid"
              @trigger="goToStep(step.index)"
              :selected="`${step.selected}`"></e-step>
    </e-step-bar>
  </MainHeader>
</template>
