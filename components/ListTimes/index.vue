<template>
  <transition name="fade" mode="out-in">
    <div class="list-times" v-if="listTimes.length > 0">
      <span class="times-day">
        <slot></slot>
      </span>
      <div class="list-times__time">
        <div class="list-times__inner">
          <TransitionGroup name="list">
            <div
              class="list-col"
              v-for="(item, index) in listTimes"
              :key="item"
            >
              <span
                class="list-time__item"
                v-for="(slot, index) in item"
                :key="slot + index"
                @click="
                  store.pushTime(slot),
                    deleteTimeSlot(slot),
                    (activeItem = slot)
                "
                :class="{
                  'item-active': store.activeItem(slot) != -1,
                  'item-booked': slot.booked,
                  'admin-view':
                    slot.booked && adminView == true && store.isAdmin,
                }"
              >
                {{ slot.timeslot }}
              </span>
            </div>
          </TransitionGroup>
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
  </transition>
</template>
<script setup>
const store = useStore();

const activeItem = ref(null);

const props = defineProps({
  listTimes: {
    type: Array,
    required: true,
    default: [],
  },
  adminView: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const visibleSettings = ref(false);

const close = () => {
  visibleSettings.value = false;
};

const deleteTimeSlot = async (slot) => {
  if (!store.isAdmin && !slot.booked) {
    return;
  }

  if (slot.booked) {
    visibleSettings.value = true;
  }
};
</script>
<style></style>
