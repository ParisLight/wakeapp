<template>
  <div class="auth">
    <div class="container">
      <div class="auth__inner">
        <NuxtLink to="/">
          <h2 class="title auth__title">WAKE BRYANSK</h2>
        </NuxtLink>
        <Transition name="page" mode="out-in">
          <KeepAlive>
            <component :is="!activeTab ? route.query.data : activeTab " @setTab="setTab"></component>
          </KeepAlive>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const store = useStore();

const activeTab = ref(!route.query.data ? 'Sign' : '');

const routeAdmin = route.query.role === 'admin';

if(routeAdmin){
  store.isAdmin = true;
}

const setTab = (value) => (activeTab.value = value);
</script>
<style lang=""></style>
