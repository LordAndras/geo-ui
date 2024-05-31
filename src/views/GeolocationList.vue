<script setup lang="ts">
import {useGeoLocationsStore} from "../store/geo-locations-store.ts";
import {GeoLocation} from "../lib/utils/geo-csv-parser.ts";

const locationStore = useGeoLocationsStore()

function isLocationValid(location: GeoLocation): boolean {
  return locationStore.invalidLocations?.includes(location) ?? false
}
</script>

<template>
  <div style="width: 90%; height: 50vh" class="e-scrollable">
    <div class="e-scrollable__content">
      <e-accordion>
        <e-accordion-item v-for="location in locationStore.locations" :key="JSON.stringify(location)">
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

