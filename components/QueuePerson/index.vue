<template>
  <div class="user-item">
    <div class="queue-wrapper">
      <Transition name="fade">
        <div class="queue-basket" v-show="confirmDelete">
          <img src="/img/basket.svg" alt="basket" />
        </div>
      </Transition>
      <div
        ref="personItem"
        class="queue__item"
        :class="{
          'queue__item-owner': store.userProfile[0].user_id === personId,
        }"
      >
        <div class="queue__time">
          <span
            class="queue__time-text"
            :class="{
              'queue__time-owner': store.userProfile[0].user_id === personId,
            }"
          >
            - {{ bookedTime }} -
          </span>
        </div>
        <div class="queue__person">
          <div
            class="queue__avatar"
            :class="{
              'avatar-owner': store.userProfile[0].user_id === personId,
            }"
          >
            <img :src="personAvatar" alt="avatar" />
          </div>
          <div class="queue__info">
            <div class="queue__person-text">
              <span
                class="queue__name"
                :class="{
                  'queue__name-owner':
                    store.userProfile[0].user_id === personId,
                }"
              >
                {{ personName }}
                <span class="queue__lvl">{{ personLvl }}</span>
              </span>
            </div>
            <!-- ачивки -->
            <!-- <div class="queue__awards">
          <img :src="personAwards" alt="awards" />
        </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const store = useStore();

const props = defineProps({
  bookedTime: {
    type: String,
    require: true,
  },
  personId: {
    type: Number,
    require: true,
  },
  personAvatar: {
    type: String,
    require: true,
  },
  personName: {
    type: String,
    require: true,
  },
  personLvl: {
    type: String,
    require: false,
  },
  personAwards: {
    type: String,
    require: false,
  },
});

const personItem = ref(null);

const confirmDelete = ref(false);

const emit = defineEmits(["confirmDelete, finalDelete"]);

onMounted(() => {
  if (store.isAdmin) {
    const person = personItem.value;

    const hammer = new Hammer(person);

    hammer.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });

    let translateX = 0;
    const maxTranslateX = 60;

    hammer.on("swiperight", function (ev) {
      if (translateX < maxTranslateX) {
        translateX += maxTranslateX;
        person.style.transition = "transform 0.3s";
        person.style.transform = `translateX(${translateX}px)`;
        confirmDelete.value = true;
        emit("confirmDelete");
      } else {
        emit("finalDelete");
        person.style.transition = "transform 0.3s";
        person.style.transform = `translateX(${400}px)`;
        confirmDelete.value = false;
      }
    });

    hammer.on("swipeleft", function (ev) {
      if (translateX > 0) {
        translateX -= maxTranslateX;
        person.style.transition = "transform 0.3s";
        person.style.transform = `translateX(${translateX}px)`;
        confirmDelete.value = false;
      }
    });
  }
});
</script>
<style lang=""></style>
