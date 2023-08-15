<template>
  <div class="booked">
    <div class="booked__img">
      <img src="/img/booked.svg" alt="waves" />
    </div>
    <div class="booked__text-wrapper">
      <span class="booked__text">
        Забронировать {{ recalculation }}
      </span>
    </div>
  </div>
</template>
<script setup>
const store = useStore();

// склонения 
const recalculation = computed(() => {

  const countOfBookedTime = ref(store.bookedTime.length);

  if(countOfBookedTime.value > 4){
    return '(' + countOfBookedTime.value + ')' + ' сетов'; 
  }

  if(countOfBookedTime.value > 1){
    return '(' + countOfBookedTime.value + ')' + ' сета'; 
  }

  else{
    return '(' + countOfBookedTime.value + ')' + ' сет'; 
  }
})
</script>
<style lang=""></style>
