<script setup lang="ts">

import {computed} from "vue";

interface TextInputProps {
  formId: string
  value?: string
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<TextInputProps>(), {
  disabled: true,
})
const initial = computed(() => props.value)

const emits = defineEmits<{
  (event: 'onValueChange', changeEvent: { formId: string, value: string }): void
}>()

function updateValue(event: Event) {
  emits('onValueChange', {formId: props.formId, value: (event.target as HTMLInputElement).value})
}
</script>

<template>
  <div class="e-field">
    <label class="e-field__label" for="input">
      {{ label }}
    </label>
    <input class="e-input"
           type="text"
           placeholder="Type stuff here"
           :value="initial"
           :disabled="disabled"
           @input="updateValue($event)"
    >
  </div>
</template>
