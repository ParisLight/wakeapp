<template>
  <div
    class="date__grid"
    @click="$emit('gridRow')"
    :class="{ 'is-active': activeFilter }"
  >
    <div class="grid-inner">
      <div
        class="date__rect"
        v-for="(item, index) in 9"
        :key="index"
        :class="{
          'rect-active': activeFilter && index % 3 == 2,
        }"
      ></div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  activeFilter: {
    type: Boolean, 
    required: true
  }
})

const emit = defineEmits(['gridRow'])
</script>
<style lang=""></style>
