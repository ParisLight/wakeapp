<template>
    <div class="list-profile">
        <div class="list-profile-wrapper">
            <h3 class="list-title">
                <slot>Заголовок</slot>
            </h3>
        </div>
        <div class="list-items">
          <div class="list-item" v-for="(item, index) in listItems" :key="index">
            <!-- items ... -->
          </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  listItems: {
    type: Array,
    required: true
  }  
})
</script>
<style>
    
</style>