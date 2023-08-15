<template>
  <div
    class="product services__product"
    :style="{
      backgroundImage: 'url(' + `${props.img}` + ')',
    }"
  >
    <div class="settings__btn" v-if="props.isAdmin">
      <div class="settings__img" @click.stop="$emit('showSettings')">
        <img src="/img/settings-dots.svg" alt="settings" />
      </div>
    </div>
    <div class="services__product-front">
      <div class="product-name services__product-name">
        <span class="product__sub-title">
          {{ props.title }}
        </span>
      </div>
      <div class="product-price services__product-price">
        <div class="product-days services__product-days">
          <span class="product-days-text">Будни</span>
          <span class="product-days-price">{{ props.weekdayPrice }} ₽ / {{timeslotWeekday}} мин</span>
        </div>
        <div class="product-days services__product-days">
          <span class="product-days-text">Выходные</span>
          <span class="product-days-price">{{ props.weekendPrice }} ₽ / {{timeslotWeekend}} мин</span>
        </div>
      </div>
    </div>
    <div class="services__rect-wrapper">
      <img
        class="services__rect"
        src="/img/orange-rect.png"
        alt="rect"
      />
    </div>

    <div class="product__icon-wrapper">
      <img class="services__icon" :src="props.icon" alt="wave" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isAdmin: {
    type: Boolean,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  weekdayPrice: {
    type: Number,
    required: true,
  },
  weekendPrice: {
    type: Number,
    required: true,
  },
  timeslotWeekday: {
    type: Number,
    required: false,
    default: 10
  },
  timeslotWeekend: {
    type: Number,
    required: false,
    default: 10
  },
  img: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

</script>
<style lang=""></style>
