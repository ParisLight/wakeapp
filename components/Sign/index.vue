<template>
  <div class="registration" ref="registration">
    <div class="auth__registration">
      <h3 class="sub-title auth__text">ВХОД</h3>
    </div>
    <form class="auth__inputs">
      <div class="auth__input">
        <!-- numberPhone -->
        <MyInput
          placeholder="Почта"
          v-model="userEmail" 
          class="auth__input"
        />
        <img :src="validateEmail" class="auth__icon" alt="tel" />
      </div>
      <div class="auth__input">
        <!-- name -->
        <MyInput
          placeholder="Пароль"
          type="password"
          v-model="userPassword"
          class="auth__input"
        />
        <img :src="validateName" class="auth__icon" alt="contact" />
      </div>
    </form>
    <MyButton
      class="auth__btn"
      :class="{ 'auth__btn-disabled': !enableButton }"
      @click="authorization(userEmail, userPassword)"
      >ВОЙТИ</MyButton
    >
    <div class="auth__sign" @click="$emit('setTab', 'Registration')">
      <span class="auth__sign-text">или</span>
      <div class="sign">
        <span class="sign__text">Зарегистрироваться</span>
        <div class="sign__arr">
          <img src="/img/promo_arr.svg" alt="arr" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import MyInput from "@/components/UI/MyInput/index.vue";
import MyButton from "@/components/UI/MyButton/index.vue";
import apiConfig from "@/api/apiConfig";

const store = useStore()

const userPassword = ref("");
const userEmail = ref("");

const validateName = computed(() => {
  return userPassword.value ? "img/input_name-active.svg" : "img/input_contact.svg";
});

// /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
const validateEmail = computed(() => {
  return userEmail.value ? "img/input_tel-active.svg" : "img/input_tel.svg";
});

const enableButton = computed(() => {
  return !userPassword.value || !userEmail.value ? false : true;
});

const authorization = async (userMail, userPassword) => {

  try {
    const { data } = await useAsyncData(() => $fetch(`${apiConfig.baseURL}/auth`, {
      method: "POST",
      body: {
        password: userPassword.toUpperCase(),
        phone: userMail.toUpperCase(),
      },
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
    })) 
 
    const token = await data.value.data.token

    window.localStorage.setItem('access-token', token)
    
    apiConfig.headers.Authorization = `Bearer ${window.localStorage.getItem('access-token')}`


    navigateTo('/servic');

  } catch (error) {
    console.error(error);
  }
};
</script>
<style lang=""></style>
