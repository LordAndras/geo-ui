<script setup lang="ts">

import FileUploader from "../components/FileUploader.vue";

interface Props {
  isValid: boolean
}

defineProps<Props>()

const onUploadError = () => {
  emit('update:model-value', false)
}

const emit = defineEmits<{
  (event: 'update:model-value', value: boolean): void
}>()

</script>

<template>
  <div>
    <div class="e-section__title">Upload Geolocations CSV</div>
  </div>
  <div class="e-section__content">
    <FileUploader :disabled="false" @file-upload-error="onUploadError"></FileUploader>
  </div>
  <span v-if="!isValid" class="e-field__message e-field__message-error">
        <span>{{ 'This file is not a CSV.' }}</span>
      </span>
</template>

