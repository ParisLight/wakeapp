<template>
  <Transition name="fade" mode="in-out" @after-enter="enableShow = true">
    <div
      v-if="statePopup"
      class="popup-background"
      @click="enableShow = false "
    >
      <Transition name="translateY" @after-leave="$emit('closePopup')" mode="out-in">
        <div class="popup" @click.stop v-if="enableShow">
          <div class="popup-title__wrapper">
            <h3 class="popup-title">Для кого бронировать?</h3>
          </div>
          <div class="popup__inputs">
            <input type="text" placeholder="Имя" class="popup-input" />
            <input type="text" placeholder="Телефон" class="popup-input" />
          </div>
          <div class="popup__checkbox">
            <label for="chk" class="popup__label">
              <input type="checkbox" name="" id="chk" class="popup__chck" />
              <span class="chck__text"> Выслать бронь по смс </span>
            </label>
          </div>
          <NuxtLink
            to="/confirmation"
            @click.native="$emit('closePopup')"
          >
            <BookingBtn class="popup__btn" v-if="store.bookedTime.length" />
          </NuxtLink>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script setup>
import BookingBtn from "@/components/UI/BookingBtn/index.vue";

const store = useStore();
const enableShow = ref(false);

const props = defineProps({
  statePopup: {
    type: Boolean,
    required: true
  }
})
// запрос....
</script>
<style lang=""></style>
