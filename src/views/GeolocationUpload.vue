<script setup lang="ts">

import FileUploader from "../components/FileUploader.vue";
import {useGeoCsvStore} from "../store/geo-csv-store.ts";
import {FileData} from "../lib/utils/types.ts";
import {parse} from "../lib/utils/geo-csv-parser.ts";
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";

interface Props {
  isValid: boolean
}

defineProps<Props>()

const fileStore = useGeoCsvStore()
const locationStore = useGeoLocationsStore()

const onUploadError = () => {
  fileStore.isValid = false
}

const onFileUpload = (fileData: FileData) => {
  fileStore.fileName = fileData.fileName
  fileStore.content = fileData.content
  fileStore.isValid = fileData.type == "text/csv"

  if (fileStore.isValid) {
    locationStore.locations = parse(atob(fileStore.content))
  }
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

