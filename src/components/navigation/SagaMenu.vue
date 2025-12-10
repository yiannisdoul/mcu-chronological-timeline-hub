<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeSaga = ref(null);

const toggleSaga = (saga) => {
  if (activeSaga.value === saga) {
    activeSaga.value = null;
  } else {
    activeSaga.value = saga;
  }
};

const navigateTo = (filter) => {
  router.push({ name: 'timeline', params: { filter } });
};
</script>

<template>
  <div class="relative h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
    
    <div class="absolute opacity-10 pointer-events-none">
      <h1 class="text-[20vw] font-black tracking-tighter text-red-600">MARVEL</h1>
    </div>

    <div class="z-10 flex flex-col items-center gap-4">
      <button 
        @click="navigateTo('super-chrono')"
        class="w-64 h-64 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 shadow-[0_0_60px_rgba(234,179,8,0.5)] 
               flex items-center justify-center text-center p-4 hover:scale-105 transition-transform duration-300 group"
      >
        <div>
          <h2 class="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-md">Ultimate Order</h2>
          <p class="text-xs text-yellow-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            All 108 Titles • Complete Timeline
          </p>
        </div>
      </button>
    </div>

    <div class="absolute bottom-20 left-20 md:bottom-32 md:left-32 z-20">
      <button 
        @click="toggleSaga('infinity')"
        class="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-purple-900 shadow-2xl 
               flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <span class="font-bold text-lg text-center">Infinity<br>Saga</span>
      </button>

      <div v-if="activeSaga === 'infinity'" class="absolute -top-32 left-0 flex flex-col gap-4">
        <button @click="navigateTo('phase-1')" class="w-16 h-16 rounded-full text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200 bg-blue-500">Phase 1</button>
        <button @click="navigateTo('phase-2')" class="w-16 h-16 rounded-full text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200 bg-blue-500">Phase 2</button>
        <button @click="navigateTo('phase-3')" class="w-16 h-16 rounded-full text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200 bg-blue-500">Phase 3</button>
      </div>
    </div>

    <div class="absolute bottom-20 right-20 md:bottom-32 md:right-32 z-20">
      <button 
        @click="toggleSaga('multiverse')"
        class="w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-red-900 shadow-2xl 
               flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <span class="font-bold text-lg text-center">Multiverse<br>Saga</span>
      </button>

      <div v-if="activeSaga === 'multiverse'" class="absolute -top-32 right-0 flex flex-col gap-4 items-end">
        <button @click="navigateTo('phase-4')" class="w-16 h-16 rounded-full text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200 bg-red-500">Phase 4</button>
        <button @click="navigateTo('phase-5')" class="w-16 h-16 rounded-full text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200 bg-red-500">Phase 5</button>
        <button @click="navigateTo('phase-6')" class="w-16 h-16 rounded-full text-white font-bold text-xs shadow-lg hover:scale-110 transition-transform duration-200 bg-red-500">Phase 6</button>
      </div>
    </div>

  </div>
</template>
<style scoped>
/* Define the keyframes for floating */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); } /* Move up 10px */
  100% { transform: translateY(0px); }
}

/* Apply animation classes */
.menu-bubble {
  animation: float 6s ease-in-out infinite;
}

/* Offset animations so they don't move in sync */
.menu-bubble:nth-child(1) { animation-delay: 0s; }
.menu-bubble:nth-child(2) { animation-delay: 1s; } /* Multiverse floats later */
.menu-bubble:nth-child(3) { animation-delay: 2s; } /* Infinity floats later */
</style>