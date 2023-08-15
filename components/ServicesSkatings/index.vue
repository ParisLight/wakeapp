<template>
  <Transition name="list">
    <div class="services__skatings" >
      <div class="settings__btn" v-if="props.isAdmin">
        <div class="settings__img">
          <img src="/img/settings-dots.svg" alt="settings" />
        </div>
      </div>
      <div class="services__board">
        <img src="/img/surfboard.svg" alt="surfboard" />
      </div>
      <div class="services__info">
        <div class="services__day" v-if="timesList.length">
          <span>{{ timesList[0]?.date }}</span>
        </div>
        <div class="services__times" v-if="timesList.length">
          <span v-for="(slot, index) in timesList" :key="index">
             {{ slot?.time }}{{index !== timesList.length -1 ? ',' : ''}} 
          </span>
        </div>
        <div class="services__btn">
          <nuxt-link to="/date">Записаться</nuxt-link>
          <div class="services__img-wrapper">
            <img src="/img/service_arr.svg" alt="arr" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
const props = defineProps({
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  timesList: {
    tpye: Array,
    required: true,
  },
});

</script>
