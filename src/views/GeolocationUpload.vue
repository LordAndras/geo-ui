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
    <e-notification v-show="!locationStore.locations" class="e-margin-bottom-l e-margin-top-l" type="info">
      <e-notification-content>
        Select a file in CSV format to import your geolocations. If you do not have a file, please proceed to the next
        step.
      </e-notification-content>
    </e-notification>
    <e-notification v-show="locationStore.locations" class="e-margin-top-l" type="info">
      <e-notification-content>
        Your uploaded file contains {{ locationStore.locations?.length }} locations. You can add more in the next step.
      </e-notification-content>
    </e-notification>
    <e-notification v-show="!locationStore.hasInvalidLocations && locationStore.locations" class="e-margin-top-l" type="success">
      <e-notification-content>
        Your uploaded file contains valid locations only.
      </e-notification-content>
    </e-notification>
    <e-notification v-show="locationStore.hasInvalidLocations" class="e-margin-top-l" type="error">
      <e-notification-content>
        <p class="text-color-error">
          Your uploaded file contains {{ locationStore.invalidLocations?.length }} invalid locations based on
          longitude and latitude values. You can fix these values in the next step.
        </p>
        <ul class="text-color-error">
          <li v-for="location in locationStore.invalidLocations" :key="JSON.stringify(location)">
            {{ location.desc }} - Latitude {{ location.lat }}, Longitude: {{ location.lon }}
          </li>
        </ul>
      </e-notification-content>
    </e-notification>
  </div>
  <span v-if="!isValid" class="e-field__message e-field__message-error">
        <span>{{ 'This file is not a CSV.' }}</span>
  </span>
</template>

