<template>
  <div class="signed-layout">
    <Header />
    <slot />
    <Transition name="fade" mode="out-in">
      <Menu v-if="actUrl" />
    </Transition>
  </div>
</template>
<script setup>
import servicesApi from "@/api/servicesApi";
import userApi from "@/api/userApi";
import sheduleApi from "@/api/scheduleApi";
import { useDateKit } from "@/composables/useDateKit/useDateKit";

import { io } from "socket.io-client";

import { useDecodeToken } from "@/composables/useDecodeToken/useDecodeToken";
const { getSchedulesForUser, getScheduleById } = sheduleApi();

const store = useStore();
const route = useRoute();

const { generateDate } = useDateKit();
const { actualDate } = generateDate();
const { decodeToken } = useDecodeToken();
const { getServices, getServicesById } = servicesApi();
const { getUserProfileById } = userApi();

const socket = io("https://wakeapp-socket.testers-site.ru");

socket.on("msgToClient", async (payload) => {
  await store.loadActualSchedule();
  await store.fillQueueList();
});

const actUrl = computed(() => {
  return route.path == "/confirmation" ? false : true;
});

const idProfile = decodeToken(window.localStorage.getItem("access-token")).id;

store.activeDateTab = actualDate;

getServices().then((response) => {
  if (response == "Invalid token") {
    window.localStorage.removeItem("access-token");
    navigateTo("/auth");
  }
});

async function fetchData() {
  try {
    // Получаем все необходимые данные параллельно
    const [services, userProfile, userSchedules, schedule, weatherData] =
      await Promise.all([
        getServices(),
        getUserProfileById(idProfile),
        getSchedulesForUser(idProfile),
        getScheduleById(store.sportTab),
        store.getWeatherData(),
      ]);
    console.log(services);
    // После успешного получения всех данных, обновляем состояние
    store.services = services;
    store.userProfile = userProfile;
    store.changeSelect(services[0]);
    store.actualSkatings = store.createCardSkating(userSchedules);
    store.queueList = schedule;
    store.initActualSports();
  } catch (error) {
    console.log(error, 'error in fetch Data signed layout');
  }
}

fetchData();

useHead({
  script: [{ src: "https://telegram.org/js/telegram-web-app.js" }],
});

window.Telegram?.WebApp.expand();
</script>
<style></style>
