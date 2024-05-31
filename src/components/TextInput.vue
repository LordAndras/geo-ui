<script setup lang="ts">
interface TextInputProps {
  label: string
  value: string | number | undefined
  disabled?: boolean
}

withDefaults(defineProps<TextInputProps>(), {
  disabled: true,
})
</script>

<template>
  <div class="e-field">
    <label class="e-field__label" for="input">
      {{ label}}
    </label>
    <input class="e-input" id="input" type="text" placeholder="Type stuff here" :value="value ?? ''" :disabled="disabled">
  </div>
</template>
