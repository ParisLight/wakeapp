<template>
  <div class="confirmation">
    <div class="container">
      <template v-if="!confirmBooked">
        <div class="confirmation__title-wrapper">
          <h2 class="confirmation__title">Подтверждение бронирования</h2>
        </div>
        <div class="confirmation__rows">
          <div class="confirmation__row">
            <span class="confirmation__subtitle">Услуга</span>
            <span class="confirmation__info">{{
              store.activeServiceSelect.shortname
            }}</span>
          </div>
          <div class="confirmation__row">
            <span class="confirmation__subtitle">дата</span>
            <span class="confirmation__info">
              {{ formattedDate(store.activeDateTab) }}
            </span>
          </div>
          <div class="confirmation__row">
            <span class="confirmation__subtitle">время</span>
            <div class="confirmation__info">
              <span
                class="confirmation__item"
                v-for="item in store.bookedTime"
                :key="item.index"
              >
                {{ item.timeslot }};
              </span>
            </div>
          </div>
          <div class="confirmation__row">
            <span class="confirmation__subtitle">Стоимость</span>
            <span class="confirmation__info">{{ sumOfBooked }} ₽</span>
          </div>
        </div>
        <div class="confirmation__descriptions">
          <div class="confirmation__description">
            <span class="confirmation__text">
              Вам нужно прибыть на место катания за 20 минут до начала
            </span>
          </div>
          <div class="confirmation__description">
            <span class="confirmation__text">
              оплату можно произвести картой или наличными в кассе
            </span>
          </div>
        </div>
        <div class="confirmation__bottom">
          <BookingBtn
            @click.native="confirm()"
          />
          <NuxtLink to="/date">
            <span class="confirmation-prev">Вернуться к записи</span>
          </NuxtLink>
        </div>
      </template>
      <Transition name="fade" mode="out-in">
        <template v-if="confirmBooked">
          <div class="success-confirm">
            <div class="confirmation__title-wrapper">
              <h2 class="confirmation__title">Успешно!</h2>
            </div>
            <div class="confirmation__img-wrapper">
              <img
                class="confirmation__img"
                src="/img/success_bg.svg"
                alt="surfce"
              />
            </div>
            <div class="confirmation__booked">
              <span class="confirmation__booked-text">
                Время забронировано! Увидимcя на волне
                <div class="confirmation__booked-smile">
                  <img src="/img/smile.svg" alt="smile" />
                </div>
              </span>
            </div>
            <div class="confirmation__bottom">
              <NuxtLink to="/queue" @click.native="checkQueue()">
                <div class="confirmation__queue">
                  <span class="confirmation__queue-text">
                    посмотреть очередь
                  </span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </Transition>
    </div>
  </div>
</template>
<script setup>
import BookingBtn from "@/components/UI/BookingBtn/index.vue";
import { useDateKit } from "@/composables/useDateKit/useDateKit";
import scheduleApi from "@/api/scheduleApi";
const { postSchedule, getSchedulesForUser } = scheduleApi();
import { useDecodeToken } from "@/composables/useDecodeToken/useDecodeToken";

const { checkIsWeekDay, formattedDate } = useDateKit();

const store = useStore();

const checkQueue = () => {
  store.sendForm(false);
  store.sportTab = store.activeServiceSelect.id;
}

if (!store.services) {
  navigateTo("/servic");
}

definePageMeta({
  layout: "signed",
  pageTransition: {
    name: "pageY",
    mode: "out-in",
  },
});
const confirmBooked = ref(false);

const postBooked = async () => {
  const isWeekDay = checkIsWeekDay(store.activeDateTab);

  let arrayIsWeekdayFlag = [];

  for (let i = 0; i < store.convertedBookedTimes.length; i++) {
    arrayIsWeekdayFlag.push(isWeekDay);
  }

  const responseSchedule = await postSchedule(
    store.convertedBookedTimes,
    store.userProfile[0].user_id,
    arrayIsWeekdayFlag,
    store.activeServiceSelect.id,
    0);

  const { decodeToken } = useDecodeToken();


  if(responseSchedule){
    // const idProfile = decodeToken(useCookie("access-token").value).id;
    const idProfile = decodeToken(window.localStorage.getItem("access-token")).id;


    getSchedulesForUser(idProfile).then((resolve) => {
      store.actualSkatings = store.createCardSkating(resolve);
    });
  }
};

const confirm = () => {
  confirmBooked.value = true;
  postBooked();
  store.bookedTime = [];
}

const sumOfBooked = computed(() => {
  return store.activeServiceSelect.price_weekday * store.bookedTime.length;
});
</script>
<style lang=""></style>
