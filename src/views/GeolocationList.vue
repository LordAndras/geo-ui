<script setup lang="ts">
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";
import {computed} from "vue";

interface Props {
  locationOption: string
}

const props = withDefaults(defineProps<Props>(), {
  locationOption: 'all',
})
const selectedLocationOption = computed(() => props.locationOption)

const locationStore = useGeoLocationsStore()
const locations = computed(() => {
  switch (selectedLocationOption.value) {
    case 'all': return locationStore.locations
    case 'invalid': return locationStore.invalidLocations
    case 'valid': return locationStore.validLocations
  }
})

function isLocationValid(location: GeoLocation): boolean {
  return locationStore.invalidLocations?.includes(location) ?? false
}
</script>

<template>
  <div style="width: 90%; height: 50vh" class="e-scrollable">
    <div class="e-scrollable__content">
      <e-accordion v-for="location in locations" :key="JSON.stringify(location)">
        <e-accordion-item>
          <e-accordion-item-label :class="{'text-color-error': isLocationValid(location)}">
            {{ location.desc }}
          </e-accordion-item-label>
          <e-accordion-item-content :class="{'text-color-error': isLocationValid(location)}">
            <p>Latitude: {{ location.lat }}</p>
            <p>Longitude: {{ location.lon }}</p>
          </e-accordion-item-content>
        </e-accordion-item>
      </e-accordion>
    </div>
  </div>
</template>

