<template>
  <div class="promo">
    <div class="container">
      <div class="promo__inner">
        <h1 class="title promo__title">
          WAKE <br />
          BRYANSK
        </h1>
        <div class="promo__description">
          <span class="orange-text">Отдых <br />на любой вкус</span>
        </div>
        <div class="promo__sport">
          <span class="promo__text">
            Активный спорт на природе <br />в хорошей компании
          </span>
        </div>
        <div class="promo__active">
            <div class="sign" @click="router.push({path: '/auth', query: {data: 'Sign'}})" >
              <span class="sign__text">Вход</span>
              <div class="sign__arr">
                <img src="/img/promo_arr.svg" alt="arr" />
              </div>
            </div>
            <MyButton 
              @click.native="router.push({path: '/auth', query: {data: 'Registration'}})"
              class="promo__btn">
              РЕГИСТРАЦИЯ
            </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyButton from "@/components/UI/MyButton/index.vue";
const router = useRouter();

definePageMeta({
  title: "My home page",
});
useHead({
  title: "WakeApp",
  meta: [{}],
});
</script>
