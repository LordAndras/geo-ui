<script setup lang="ts">

import {FileData, Option} from "../lib/utils/types.ts";

interface Props {
  placeHolder: Option<string>
}

defineProps<Props>()

const emit = defineEmits<{
  (event: 'fileUpload', fileData: FileData): void
  (event: 'fileUploadError'): void
}>()

const uploadEventListener = (files: FileList) => {
  const selectedFile: File = files[0]
  if (
      selectedFile.type !== 'text/csv'
  ) {
    return emit('fileUploadError')
  }
  const reader = new FileReader()
  reader.readAsDataURL(selectedFile)
  reader.onload = function () {
    if (reader.result && typeof reader.result === 'string') {
      emit('fileUpload', {content: reader.result.split(',')[1], fileName: selectedFile.name, type: selectedFile.type})
    } else {
      return emit('fileUploadError')
    }
  }
}
</script>

<template>
  <div>
    <e-upload
        ref="uploadGeolocations"
        :placeholder="placeHolder ?? 'Geolocation Import File'"
        button="Upload"
        @update="uploadEventListener($event.detail.files)"
    ></e-upload>
  </div>
</template>

