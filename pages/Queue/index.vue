<template>
  <div class="queue">
    <div class="queue__sports">
      <div class="container">
        <div class="queue__sports-inner">
          <span
            v-for="(item, index) in store.queueSports"
            :key="index"
            @click="changeSportTab(item.id)"
            class="queue__sport"
            :class="{ 'queue__sport-active': store.sportTab === item.id }"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="container">
      <transition name="fade" mode="out-in">
        <div class="queue__out" v-if="closestTime">
          <div class="queue__t-wrapper">
            <div class="queue__line">
              <img src="/img/out-line1.svg" alt="line" />
            </div>
            <span class="queue__out-text">
              До выхода
              <span class="queue__out-orange">≈{{ closestTime }}</span>
            </span>
            <div class="queue__line-2">
              <img src="/img/out-line1.svg" alt="line" />
            </div>
          </div>
        </div>
      </transition>
      <div class="queue__list">
        <TransitionGroup name="list">
          <QueuePerson
            v-for="(person, index) in timeSortedQueue"
            :key="person"
            :personAvatar="person.userProfile.avatar"
            :personName="person.userProfile.user[0].name"
            :bookedTime="person.service_date.slice(11, 16)"
            :personId="person.user_id"
            :class="{ 'is-active': allowEdit == person && store.isAdmin }"
            @confirmDelete="editableRow(person)"
            @finalDelete="finalDelete(person.id)"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>
<script setup>
import scheduleApi from "@/api/scheduleApi.js";
import { useDecodeToken } from "@/composables/useDecodeToken/useDecodeToken";

definePageMeta({ layout: "signed" });

const store = useStore();

const { getScheduleById, getSchedulesForUser, deleteScheduleById } =
  scheduleApi();

const allowEdit = ref(null);

const editableRow = async (person) => {
  allowEdit.value = person;
};
// оконательное удаление из списка
const finalDelete = async (idSchedule) => {
  try {
    const response = await deleteScheduleById(idSchedule);
    store.queueList = store.queueList.filter(
      (skating) => skating.id != idSchedule
    );
    const { decodeToken } = useDecodeToken();

    // const idProfile = decodeToken(useCookie("access-token").value).id;
    const idProfile = decodeToken(window.localStorage.getItem("access-token")).id;

    getSchedulesForUser(idProfile).then((resolve) => {
      //need sockets
      store.actualSkatings = store.createCardSkating(resolve);
    });
  } catch (e) {
    console.error(e);
  }
};
// загрузить расписание на другой таб
const changeSportTab = (index) => {
  store.sportTab = index;
  getScheduleById(store.sportTab).then((resolve) => {
    store.queueList = resolve;
  });
};

const timeSortedQueue = computed(() => { // => []
  const currentTime = new Date().getTime();
  // индекс ближайшего актуального чела
  const idxClosestTime = store.queueList.findIndex(
    (item) => new Date(item.service_date) > currentTime
  );
  console.log(idxClosestTime, 'idx')
  let preventElems = null;
  // лутаем предыдущие 3 слота
  if (idxClosestTime >= 3) {
    preventElems = store.queueList.slice(idxClosestTime - 3, idxClosestTime);
  } else {
    preventElems = store.queueList.slice(0, idxClosestTime);
  }
  // сортировка по актуальному времени
  const sortedQueue = store.queueList.filter((queueItem) => {
    return new Date(queueItem.service_date).getTime() > currentTime;
  });
  console.log(store.queueList)
  console.log(preventElems)
  // добавляем в начало массива предыдущие 3 элема
  sortedQueue.unshift(...preventElems);
  
  return sortedQueue;
});

// рассчёт времени до выхода
const closestTime = computed(() => {
  // время до ближайшего актуального слота 
  const closestSkatingObj = timeSortedQueue.value.find(
    (item) => item.user_id == store.userProfile[0].user_id
    && new Date(item.service_date).getTime() > new Date().getTime());

  if (typeof closestSkatingObj != "undefined") {
    const dateNow = new Date().getTime();
    // вычисляем время в мс
    const ms = new Date(closestSkatingObj.service_date).getTime() - dateNow;
    // в минутах
    const minutes = (ms / 60000).toFixed(0);

    if (minutes > 60) {
      // в часах
      const hours = minutes / 60;
      return hours.toFixed(1) + " ч";
    }
    return minutes + " мин";
  }
});
</script>
