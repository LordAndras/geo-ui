<script setup lang="ts">

import FileUploader from "../components/FileUploader.vue";
import {useGeoCsvStore} from "../store/geo-csv-store.ts";
import {FileData} from "../lib/utils/types.ts";

interface Props {
  isValid: boolean
}

defineProps<Props>()

const fileStore = useGeoCsvStore()

const onUploadError = () => {
  fileStore.isValid = false
}

const onFileUpload = (fileData: FileData) => {
  fileStore.fileName = fileData.fileName
  fileStore.content = fileData.content
  fileStore.isValid = fileData.type == "text/csv"
}
</script>

<template>
  <div>
    <div class="e-section__title">Upload Geolocations CSV</div>
  </div>
  <div class="e-section__content">
    <FileUploader
        :placeHolder="fileStore.fileName"
        @file-upload="onFileUpload"
        @file-upload-error="onUploadError"
    ></FileUploader>
  </div>
  <span v-if="!isValid" class="e-field__message e-field__message-error">
        <span>{{ 'This file is not a CSV.' }}</span>
  </span>
</template>

