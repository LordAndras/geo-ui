<script setup lang="ts">

import {editorSteps} from "./constants/steps.ts";
import {ref} from "vue";
import {cloneDeep} from "lodash-es";
import FileUploader from "./components/FileUploader.vue";

const steps = ref(cloneDeep(editorSteps))
const isValidFile = ref(true)

function goToStep(index: number) {
  steps.value.forEach((step) => {
    step.selected = index === step.index
  })
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
        <div>
          <div class="e-section__title">Upload Geolocations CSV</div>
        </div>
        <div class="e-section__content">
          <FileUploader :disabled="false" @file-upload-error="isValidFile = false"></FileUploader>
        </div>
        <span v-if="!isValidFile" class="e-field__message e-field__message-error">
        <span>{{ 'This file is not a CSV.' }}</span>
      </span>
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
        <e-step v-for="step in steps" :key="step.toString()" :label="step.label" @trigger="goToStep(step.index)"
                :selected="`${step.selected}`"></e-step>
      </e-step-bar>
    </main>
  </div>
</template>
