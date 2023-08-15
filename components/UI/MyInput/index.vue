<template lang="">
  <input
    type="text"
    class="custom-input"
    autocomplete="off"
    :value="props.modelValue"
    @input="updateInput($event.target.value)"
  />
</template>
<script setup>
const props = defineProps({
  modelValue: [String],
});

const emit = defineEmits(["update:modelValue"]);

const updateInput = (value) => {
  emit("update:modelValue", value);
};
</script>
<style lang=""></style>
