import { vOnClickOutside } from '@vueuse/components'
import { VueMaskDirective } from 'v-mask'
import { ref } from 'vue'
import 'swiper/css';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('on-click-outside',vOnClickOutside);
  nuxtApp.vueApp.directive('mask',VueMaskDirective );
  nuxtApp.vueApp.use(ref);  
 
})