<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import * as L from "leaflet"
import {onMounted, ref, Ref} from "vue";

const initialMap: Ref<L.Map | null> = ref(null);

onMounted(() => {
  initialMap.value = L.map('map').setView([47.8041, 21.4152], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(initialMap.value);
});
</script>

<template>
  <div id="map" style="height:50vh;"></div>
</template>

