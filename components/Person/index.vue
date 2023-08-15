<template lang="">
  <div class="person__main">
    <div class="avatar">
      <div class="avatar__img">
        <img src="/img/avat.png" alt="photo" />
      </div>
    </div>
    <div class="person-info person__person-info">
      <div class="geo person__geo">
        <img src="/img/geo.svg" alt="geo" />
        <span class="geo__text">Bryansk</span>
      </div>
      <div class="name person__name">
        <input class="name__text" :value="props.name" @input="changeName"/>
        <img class="name__edit" src="/img/edit.svg" alt="edit" />
      </div>
      <div class="person__wave">
        <img src="/img/profile-wave.svg" alt="wave" />
      </div>
      <!-- ачивки -->
      <!-- <div class="person__lvl">
        <span class="person__lvl-txt">1 lvl</span>
      </div>
      <div class="dest person__dest">
        <span class="dest-text">зеленый Сайдслайд</span>
      </div>
      <div class="person__medals">
        <img src="/img/honors.svg" alt="medals" />
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { useDebounce } from '@/composables/useDebounce/useDebounce.js';
import profileApi from '@/api/profileApi.js';

const store = useStore();
const { debounce } = useDebounce();
const { patchProfile } = profileApi();

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const currentName = ref(props.name);

// не хватает поля для патча имени
// const changeName = () => {
//   debounce(patchProfile(store.userProfile[0].user_id, currentName.value), 1500);
// }
</script>
<style lang=""></style>
