<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="arrow-left" @click="getPreventRoute()">
          <img src="/img/arrow-left.svg" alt="arr-left">
        </div>
        <div class="weather header__weather">
          <span class="air header__text">воздух</span>
          <span class="temperature header__temperature"
            >{{ store.weather.temp }}°C</span
          >
        </div>
        <div class="weather header__weather">
          <span class="wind header__text">ветер</span>
          <span class="temperature header__temperature"
            >{{ store.weather.wind }} м/с</span
          >
        </div>
        <div class="notice" @click="clearLocalStorage()">
          <img src="/img/notice.svg" alt="notice" />
          <span class="notice__circle"></span>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
const store = useStore();
const router = useRouter();

const switchToAdmin = () => {
  store.isAdmin = !store.isAdmin;
};

const clearLocalStorage = () => {
  window.localStorage.removeItem('access-token');
  navigateTo('/auth');
}

const getPreventRoute = () => {
  router.back();
}
</script>
<style lang=""></style>
