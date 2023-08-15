<template>
  <div class="menu">
    <div class="container">
      <div class="menu__inner">
        <NuxtLink to="/queue">
          <div class="menu__date">
            <img src="/img/date.svg" alt="date" />
            <span class="menu__txt">очередь</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/servic">
          <div class="menu__main">
            <img src="/img/desc.svg" alt="desc" />
          </div>
        </NuxtLink>
        <NuxtLink to="/profile">
          <div class="menu__profile">
            <img src="/img/profile.svg" alt="profile" />
            <span class="menu__txt">профиль</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang=""></style>
