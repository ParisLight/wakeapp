<template>
  <div class="services">
    <div class="container services__container">
      <div class="services__inner">
        <div class="skating-wrapper">
          <h3 class="sub-title services__title-skatings">Ближайшее катание</h3>
          <ServicesSkatings
            :isAdmin="store.isAdmin"
            :timesList="store.closestSkatings"
          />
        </div>
        <h3 class="sub-title services__sub-title">Услуги</h3>
        <div class="services__products">
          <TransitionGroup name="list" mode="out-in">
            <ServiceItem
              v-for="item in store.services"
              :key="item.id"
              :title="item.name"
              :weekdayPrice="item.price_weekday"
              :weekendPrice="item.price_weekend"
              :img="item.bg_image"
              :icon="item.icon_img"
              :timeslotWeekday="item.timeslot_weekday"
              :timeslotWeekend="item.timeslot_weekend"
              :isAdmin="store.isAdmin"
              @showSettings="showSettings(item)"
              @click="
                navigateTo('/date'),
                store.changeSelect(item)
              "
            />
          </TransitionGroup>
        </div>
        <ActionBtns
          v-show="visibleSettings"
          @editor="edit"
          @delete="delet(currentProduct)"
          @close="close"
          :deleteText="'Удалить'"
          :editText="'Редактировать'"
        />
      </div>
    </div>
  </div>
</template>
<script setup>

definePageMeta({ layout: "signed" });
const store = useStore();
const currentProduct = ref(null);

const visibleSettings = ref(false);

const delet = (item) => {
  store.services = store.services.filter((product) => product.id != item.id);
  visibleSettings.value = false;
  // store.deleteItemFromList(store.services, item)
};

const edit = () => {
  console.log("edit");
};

const close = () => {
  visibleSettings.value = false;
};

const showSettings = (item) => {
  currentProduct.value = item;
  visibleSettings.value = !visibleSettings.value;
};

</script>
