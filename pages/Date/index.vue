<template>
  <div class="date">
    <div class="container date__container">
      <div class="date__inner">
        <div class="date__actual">
          <div
            class="date__item"
            v-for="(item, index) in days"
            @click="
              store.changeTab(item[1].numbersDate),
              store.loadActualSchedule()"
            :class="{
              'date__item-active': store.activeDateTab == item[1].numbersDate,
            }"
            :key="index"
          >
            <span class="date__day">{{ item[0] }}</span>
            <span class="date__num">
              {{ item[1].day }} {{ item[1].charsMonth }}</span
            >
          </div>
        </div>
        <div class="date__top">
          <transition name="list">
            <CustomSelect
              :itemList="store.getSelectedService"
              :activeItem="store.activeServiceSelect?.shortname"
              v-if="!activeManagersFilter.rowsFilter"
              @optionClick="
                (item) => {
                  store.changeSelect(item);
                  store.loadActualSchedule();
                }
              "
            />
          </transition>
          <Transition name="fade">
            <div class="date__filters" v-if="store.isAdmin">
              <FilterGrid
                :activeFilter="activeManagersFilter.visiblesFilter"
                @gridRow="turnOnFilter('visiblesFilter')"
              />
              <FilterRow
                @filterRow="turnOnFilter('rowsFilter')"
                :activeFilter="activeManagersFilter.rowsFilter"
              />
            </div>
          </Transition>
        </div>
        <Transition name="list">
          <div
            class="manager-info date__manager-info"
            v-if="store.isAdmin && activeManagersFilter.rowsFilter"
          >
            <div class="info-row" v-for="(item, index) in 1" :key="index">
              <span>
                {{ store.activeServiceSelect.shortname }}:
                {{ getInfoTimeslots.bookedSlots }}
              </span>
              <span>Св. места: {{ getInfoTimeslots.freeSlots || "НЕТ" }}</span>
            </div>
          </div>
        </Transition>
        <Transition name="fade" mode="out-in">
          <div class="dest skatings__dest" v-if="!store.timeslots.length">
            <span class="dest-text">На данное время слотов нет</span>
          </div>
          <div v-else-if="store.timeslots.length">
            <template v-if="activeManagersFilter.rowsFilter && store.isAdmin">
              <div>
                <ListTimes
                  :listTimes="store.dividedArrayOnHours(filteredTimeslots)"
                >
                  service_name
                </ListTimes>
              </div>
            </template>
            <template v-else>
              <div>
                <ListTimes
                  :listTimes="store.timeslotsChunks.morning"
                  :adminView="activeManagersFilter.visiblesFilter"
                  class="date__list"
                >
                  Утро
                </ListTimes>
                <ListTimes
                  :listTimes="store.timeslotsChunks.day"
                  :adminView="activeManagersFilter.visiblesFilter"
                  class="date__list"
                >
                  День
                </ListTimes>
              </div>
            </template>
          </div>
        </Transition>
        <Transition name="translateY-opacity" mode="out-in">
          <BookingBtn
            v-if="store.bookedTime.length"
            @click="
              store.isAdmin ? (statePopup = true) : navigateTo('/confirmation')
            "
          />
        </Transition>
      </div>
    </div>
    <Teleport to="body">
      <Popup :state-popup="statePopup" @closePopup="statePopup = false" />
    </Teleport>
  </div>
</template>
<script setup>
import BookingBtn from "@/components/UI/BookingBtn/index.vue";
import FilterRow from "@/components/UI/FilterRow/index.vue";
import FilterGrid from "@/components/UI/FilterGrid/index.vue";
import CustomSelect from "@/components/UI/CustomSelect/index.vue";
import servicesApi from "@/api/servicesApi.js";

import { useDateKit } from "@/composables/useDateKit/useDateKit";
definePageMeta({ layout: "signed" });

const store = useStore();
const { generateDate } = useDateKit();
const { dates } = generateDate();
const { postServices } = servicesApi();

const generatedDates = [...dates.entries()];

if(!store.timeslots.length){
  store.loadActualSchedule();
}

const statePopup = ref(false);
// второй фильтр
const showInfoRows = () => {
  activeManagersFilter.rowsFilter = !activeManagersFilter.rowsFilter;
};
// первый фильтр
const availibleSlots = async () => {
  activeManagersFilter.visiblesFilter = !activeManagersFilter.visiblesFilter;
};

const getInfoTimeslots = computed(() => {
  const bookedSlots = store.timeslots.reduce((sum, current) => {
    return current.booked ? (sum += 1) : sum;
  }, 0);

  const freeSlots = store.timeslots.reduce((sum, current) => {
    return !current.booked ? (sum += 1) : sum;
  }, 0);

  return { bookedSlots, freeSlots };
});

const activeManagersFilter = reactive({
  rowsFilter: false,
  visiblesFilter: true,
});

const turnOnFilter = (filter) => {
  Object.keys(activeManagersFilter).forEach((key) => {
    activeManagersFilter[key] = false;
  });
  activeManagersFilter[filter] = true;
};

// заполнение табов актуальным временем
const days = computed(() => {
  console.log(generatedDates)
  return generatedDates;
});

const filteredTimeslots = computed(() => {
  return store.timeslots.filter((slot) => !slot.booked);
});

// обнуляем выбранные элементы, если таймслоты обновились
watch(
  () => store.timeslots,
  (newValue, oldValue) => {
    store.bookedTime = [];
  }
);
</script>
<style lang=""></style>
