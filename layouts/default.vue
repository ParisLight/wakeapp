<template>
  <div class="content">
    <slot />
  </div>
</template>

<script setup>
useHead({
  script: [{ src: "https://telegram.org/js/telegram-web-app.js" }],
});

window.Telegram?.WebApp.expand();
</script>
