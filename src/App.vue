<script setup lang="ts">

import {editorSteps} from "./constants/steps.ts";
import {ref} from "vue";
import {cloneDeep} from "lodash-es";
import GeolocationUpload from "./views/GeolocationUpload.vue";

const steps = ref(cloneDeep(editorSteps))

function goToStep(index: number) {
  steps.value.forEach((step) => {
    step.selected = index === step.index
  })
}

const isCsvValid = ref(true)

function updateValidity(value: boolean) {
  isCsvValid.value = value
}

</script>

<template>
  <div class="e-layout">
    <header class="e-layout__header e-layout__header-form">
      <a class="e-layout__back" href="#">
        <e-layout-back-button>Go to Geolocation overview</e-layout-back-button>
      </a>
      <h1 class="e-layout__title">Geolocations</h1>
    </header>
    <main class="e-layout__content e-layout__content-form">
      <section v-if="steps[0].selected" class="e-layout__section e-padding-l">
        <GeolocationUpload :is-valid="isCsvValid" @upload-success="updateValidity(true)" @upload-error="updateValidity(false)"/>
      </section>
      <section v-if="steps[1].selected" class="e-layout__section e-padding-l">
        <div class="e-section__header">
          <div class="e-section__title">Edit geolocations</div>
        </div>
        <div class="e-section__content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis odio sequi
          consectetur perspiciatis, voluptate! Quasi velit ad, mollitia maxime doloribus est! Asperiores cupiditate
          illum non distinctio deleniti dolorem impedit. Eum. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit.
        </div>
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
        <e-step v-for="step in steps" :key="step.toString()" :label="step.label" :disabled="!isCsvValid" @trigger="goToStep(step.index)"
                :selected="`${step.selected}`"></e-step>
      </e-step-bar>
    </main>
  </div>
</template>
