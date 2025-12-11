<script setup>
// This component is a simple, styled wrapper for the RouterLink
</script>

<template>
  <router-link 
    to="/" 
    class="flex items-center text-white/50 hover:text-white uppercase tracking-widest text-[10px] font-bold transition-colors duration-300 group"
  >
    <span class="mr-2 group-hover:-translate-x-1 transition-transform duration-300">←</span>
    <span>Back to Hub</span>
  </router-link>
</template>