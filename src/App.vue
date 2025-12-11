<script setup>
import { RouterView } from 'vue-router'
import NewsletterBadge from './components/ui/NewsletterBadge.vue'; 
import TechOasisBadge from './components/ui/TechOasisBadge.vue';
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <NewsletterBadge />  <TechOasisBadge />
</template>

<style>
/* Global Transition Styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Base Styles */
body {
  background-color: black;
  overflow: hidden; 
}
</style>