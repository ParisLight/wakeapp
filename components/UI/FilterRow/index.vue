<template>
  <div
    class="date__filter"
    @click="$emit('filterRow')"
    :class="{ 'is-active': activeFilter }"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script setup>
const props = defineProps({
  activeFilter: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['filterRow'])
</script>
