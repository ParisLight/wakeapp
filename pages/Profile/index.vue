<template>
  <div class="profile">
    <div class="container">
      <div class="profile__inner">
        <Person
          class="profile__person"
          :name="store.userProfile[0]?.user[0].name"
        />
        <!-- component -->
        <div v-if="store.isAdmin" class="profile__records">
          <h3 class="profile__title">Отменили запись</h3>
          <div
            class="profile__record"
            v-for="(item, index) in records"
            :key="index"
          >
            <div class="profile__time">{{ item.sport }}: {{ item.time }}</div>
            <span class="profile__day">{{ item.day }}</span>
          </div>
        </div>
        <div class="skatings">
          <div class="skatings__title-wrapper">
            <h3 class="skatings__title">Катания</h3>
          </div>
          <Transition name="fade" mode="out-in">
            <div class="skatings__items" v-if="store.actualSkatings?.length">
              <TransitionGroup name="list">
                <SkatingItem
                  v-for="skating in sortedTimeActualSkatings"
                  :key="skating.id"
                  :date-skating="skating.date"
                  :name-skating="skating.name"
                  :time-skating="skating.time"
                  :background-image="skating.bg_image"
                  @showSettings="
                    (visibleSettings = true), (idClickedSkating = skating.id)
                  "
                />
              </TransitionGroup>
            </div>
            <div
              class="dest skatings__dest"
              v-else-if="!store.actualSkatings || !store.actualSkatings?.length"
            >
              <span class="dest-text">Пока катаний нет</span>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ActionBtns
        v-show="visibleSettings"
        :deleteText="'Удалить бронь'"
        @delete="delet(currentProduct)"
        @close="close"
      />
    </Teleport>
  </div>
</template>
<script setup>
import sheduleApi from "@/api/scheduleApi";
import { useDecodeToken } from "@/composables/useDecodeToken/useDecodeToken";
definePageMeta({ layout: "signed" });

const store = useStore();

const { deleteScheduleById, getSchedulesForUser } = sheduleApi();

const visibleSettings = ref(false);
const close = () => {
  visibleSettings.value = false;
};

const idClickedSkating = ref(null);

//@todo подумать, куда вынести миллион этих сортировок
const sortedTimeActualSkatings = computed(() => {//сортировка в профиле
  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const tmpSkatings = [...store.actualSkatings];

  return tmpSkatings.sort((a, b) => {
    let [dayA, monthA] = a.date.split(" ");
    let [dayB, monthB] = b.date.split(" ");

    let monthIndexA = monthNames.indexOf(monthA);
    let monthIndexB = monthNames.indexOf(monthB);

    let dateA = new Date(2023, monthIndexA, dayA, ...a.time.split(":"));
    let dateB = new Date(2023, monthIndexB, dayB, ...b.time.split(":"));

    return dateA - dateB;
  });
});

const delet = () => {
  deleteScheduleById(idClickedSkating.value).then((resolve) => {
    store.actualSkatings = store.actualSkatings.filter(
      (product) => product.id != idClickedSkating.value
    );
    visibleSettings.value = false;
    store.fillQueueList(); //need sockets
  });
};
// для админки
const records = [
  { time: "10:10", sport: "ВЕЙК", day: "сегодня" },
  { time: "9:00", sport: "ВЕЙК", day: "2 мая" },
  { time: "11:00", sport: "ВЕЙК", day: "3 мая" },
  { time: "12:20", sport: "САП", day: "4 мая" },
];
</script>
<style lang=""></style>
