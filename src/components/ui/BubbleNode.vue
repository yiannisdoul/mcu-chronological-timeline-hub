<script setup>
const props = defineProps({
  label: String,      // Text inside the bubble
  subtext: String,    // Optional subtext (like "All 108 titles")
  colorClass: String, // Tailwind color classes (e.g. "bg-red-500")
  size: {             // 'lg' for Saga, 'sm' for Phase
    type: String,
    default: 'lg'
  }
});
</script>

<template>
  <button 
    class="rounded-full shadow-2xl flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-110 menu-bubble relative overflow-hidden group"
    :class="[
      colorClass,
      size === 'lg' ? 'w-40 h-40 md:w-48 md:h-48' : 'w-16 h-16 text-xs'
    ]"
  >
    <div class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <div class="relative z-10 p-2">
      <span class="font-bold leading-tight" :class="size === 'lg' ? 'text-lg' : 'text-[10px]'">
        {{ label }}
      </span>
      <p v-if="subtext" class="text-[10px] opacity-70 mt-1 hidden md:block">
        {{ subtext }}
      </p>
    </div>
  </button>
</template>

<style scoped>
/* Move the animation logic HERE so every bubble floats automatically */
.menu-bubble {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
</style>