<script setup lang="ts">

import {computed} from "vue";

interface TextInputProps {
  formId: string
  value?: number
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<TextInputProps>(), {
  disabled: true,
})
const initial = computed(() => props.value)

const emits = defineEmits<{
  (event: 'onValueChange', changeEvent: { formId: string, value: number }): void
}>()

function updateValue(event: Event) {
  emits('onValueChange', {formId: props.formId, value: Number((event.target as HTMLInputElement).value)})
}
</script>

<template>
  <div class="e-field">
    <label class="e-field__label" for="input">
      {{ label }}
    </label>
    <input class="e-input"
           type="number"
           placeholder="Type stuff here"
           :value="initial"
           :disabled="disabled"
           @input="updateValue($event)"
    >
  </div>
</template>

