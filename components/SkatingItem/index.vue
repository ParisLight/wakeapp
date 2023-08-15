<template>
  <div class="skating-wrapper">
    <div class="skatings__item">
      <div
        class="skatings__img"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      >
        <div class="skatings__orange">
          <img class="orange" src="/img/orange-rect.png" alt="orange" />
        </div>
      </div>
      <div class="skatings__info">
        <div class="skatings__service">
          <span>{{ nameSkating }}</span>
        </div>
        <div class="skatings__time">
          <span>
            {{ dateSkating }} в
            <span class="skatings__orange">
              {{ timeSkating }}
              <div class="skatings__wave">
                <img src="/img/wave-o.svg" alt="icon" />
              </div>
            </span>
          </span>
        </div>
      </div>
      <div class="skatings__dots" @click="$emit('showSettings', true)">
        <img src="/img/dots.svg" alt="dots" />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  nameSkating: {
    type: String,
    required: false,
  },
  dateSkating: {
    type: String,
    required: false,
  },
  timeSkating: {
    type: String,
    required: false,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
});
</script>
<style lang=""></style>
