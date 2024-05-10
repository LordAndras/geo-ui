<script setup lang="ts">

interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false
})
const emit = defineEmits<{
  (event: 'fileUpload', content: string, filename: string): void
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
      emit('fileUpload', reader.result.split(',')[1], selectedFile.name)
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
        placeholder="Geolocation Import File"
        button="Upload"
        @update="uploadEventListener($event.detail.files)"
    ></e-upload>
  </div>
</template>

