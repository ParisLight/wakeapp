<template>
  <div
    class="custom-select"
    @click="openSelect = !openSelect"
    :class="{ 'custom-select-active': openSelect }"
  >
    <span class="option-select option-select-active">
      {{ activeItem }}
      <span class="select-arr" :class="{ 'select-arr-active': openSelect }">
        <img src="/img/select-arr.svg" alt="arr" />
      </span>
    </span>
    <TransitionGroup name="list">
      <span
        v-for="item in itemList"
        :key="item.id"
        class="option-select"
        @click="$emit('optionClick', item)"
        >{{ item.shortname }}
      </span>
    </TransitionGroup>
  </div>
</template>
<script setup>

const openSelect = ref(false);

const props = defineProps({
  itemList: {
    type: Array,
    required: true
  },
  activeItem: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['optionClick'])
</script>
