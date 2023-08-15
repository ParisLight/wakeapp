import Vue3SlideUpDown from 'vue3-slide-up-down'
import Swiper from 'swiper'
// import mask from "vue-inputmasked-v3";
window.Swiper = Swiper;
import { Hammer } from 'hammerjs';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('slide-up-down', Vue3SlideUpDown)
  nuxtApp.vueApp.use(Hammer)
  
})