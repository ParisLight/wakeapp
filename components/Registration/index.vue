<template>
  <div class="registration" ref="registration">
    <div class="auth__registration">
      <h3 class="sub-title auth__text">РЕГИСТРАЦИЯ</h3>
    </div>
    <form class="auth__inputs">
      <div class="auth__input">
        <MyInput placeholder="ИМЯ" v-model="name" class="auth__input" />
        <img :src="validateName" class="auth__icon" alt="contact" />
      </div>
      <div class="auth__input">
        <MyInput placeholder="Email" v-model="email" class="auth__input" />
        <img :src="validateEmail" class="auth__icon" alt="tel" />
      </div>
      <div class="auth__input">
        <MyInput
          placeholder="Пароль"
          v-model="password"
          class="auth__input"
          type="password"
        />
        <img :src="validateEmail" class="auth__icon" alt="tel" />
      </div>
    </form>
    <MyButton
      class="auth__btn"
      :class="{ 'auth__btn-disabled': !enableButton }"
      @click="registrate()"
      >СОЗДАТЬ АККАУНТ</MyButton
    >
    <div class="auth__sign" @click="$emit('setTab', 'Sign')">
      <span class="auth__sign-text">У МЕНЯ УЖЕ ЕСТЬ АККАУНТ</span>
      <div class="sign">
        <span class="sign__text">Вход</span>
        <div class="sign__arr">
          <img src="/img/promo_arr.svg" alt="arr" />
        </div>
      </div>
    </div>
    <div class="auth__socials" style="display: none">
      <div class="auth__with">
        <span class="auth__with-text">РЕГИСТРАЦИЯ С ПОМОЩЬЮ</span>
      </div>
      <div class="auth__social-icons">
        <a href="#" class="auth__social-img">
          <img src="/img/socials_google.svg" alt="google" />
        </a>
        <a href="#" class="auth__social-img">
          <img src="/img/socials_vk.svg" alt="vk" />
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import MyInput from "@/components/UI/MyInput/index.vue";
import MyButton from "@/components/UI/MyButton/index.vue";
import profileApi from "@/api/profileApi";
import { useDecodeToken } from "@/composables/useDecodeToken/useDecodeToken";
import apiConfig from "@/api/apiConfig";

const store = useStore();

const { decodeToken } = useDecodeToken();

const name = ref("");
const email = ref("");
const password = ref("");

const validateName = computed(() => {
  return name.value ? "img/input_name-active.svg" : "img/input_contact.svg";
});

const validateEmail = computed(() => {
  return email.value ? "img/input_tel-active.svg" : "img/input_tel.svg";
});

const enableButton = computed(() => {
  return !name.value || !email.value ? false : true;
});

const postProfile = async (id, pathImg, token) => {
  const response = await fetch(
    `https://wakeapp-api.testers-site.ru/api/profile`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'https://wakeapp-api.testers-site.ru/api',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: id,
        avatar: pathImg,
      }),
    }
  );
  return await response.json();
};

const registrate = async () => {
  const response = await fetch(
    "https://wakeapp-api.testers-site.ru/api/register",
    {
      method: "POST",
      body: JSON.stringify({
        name: name.value.toUpperCase(),
        password: password.value.toUpperCase(),
        phone: email.value.toUpperCase(),
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );

  const tokenInfo = await response.json();
  window.localStorage.setItem('access-token', tokenInfo.data.token)
  // useCookie("access-token").value = tokenInfo.data.token;

  const decodedToken = decodeToken(tokenInfo.data.token);

  const profileResp = await postProfile(decodedToken.id, "/img/avat.png", tokenInfo.data.token);

  if(profileResp.id){
    return navigateTo("/servic");
  }
};
</script>
<style lang=""></style>
