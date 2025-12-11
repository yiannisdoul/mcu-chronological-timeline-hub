<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BubbleNode from '../ui/BubbleNode.vue';

const router = useRouter();

// Track state for both menus independently
const activeSagas = ref({
  infinity: false,
  multiverse: false
});

const toggleSaga = (sagaKey) => {
  activeSagas.value[sagaKey] = !activeSagas.value[sagaKey];
};

const navigateTo = (filter) => {
  router.push({ name: 'timeline', params: { filter } });
};
</script>

<template>
  <div class="relative h-screen w-screen bg-black font-sans overflow-hidden">
    
    <div class="md:hidden absolute inset-15 translate-y-1/3 flex flex-col items-center justify-center pointer-events-none select-none opacity-50 z-0 space-y-4">
      <span class="text-[8vh] font-black text-red-600 leading-none">M</span>
      <span class="text-[8vh] font-black text-red-600 leading-none">A</span>
      <span class="text-[8vh] font-black text-red-600 leading-none">R</span>
      <span class="text-[8vh] font-black text-red-600 leading-none">V</span>
      <span class="text-[8vh] font-black text-red-600 leading-none">E</span>
      <span class="text-[8vh] font-black text-red-600 leading-none">L</span>
    </div>

    <div class="hidden md:block fixed top-0 left-1/2 -translate-x-1/2 -pt-15 opacity-25 pointer-events-none select-none z-0">
      <h1 class="text-[20vw] font-black tracking-tighter text-red-600 leading-none">MARVEL</h1>
    </div>  

    <div class="absolute inset-0 z-10 flex flex-col items-center justify-between py-16 md:block md:p-0">

      <div class="relative z-30 
                  md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      >
        <BubbleNode 
          label="Ultimate MCU Order"
          subtext="108 Titles • Linear"
          color-class="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white"
          size="lg"
          @click="navigateTo('super-chrono')"
          class="w-64 h-64 md:w-72 md:h-72 z-20 text-2xl" 
        />
      </div>

      <div class="relative z-20 
                  md:absolute md:bottom-20 md:left-20 lg:bottom-32 lg:left-32"
      >
        <div class="relative flex items-center justify-center">
          <BubbleNode 
            label="Infinity Saga"
            color-class="bg-gradient-to-br from-blue-600 to-purple-900 text-white"
            size="lg"
            @click="toggleSaga('infinity')"
            class="relative z-20"
          />

          <transition name="orbit">
            <div v-if="activeSagas.infinity" class="absolute inset-0 z-10 pointer-events-none">
              <div class="absolute top-0 left-0 -translate-x-[60%] -translate-y-[60%] pointer-events-auto">
                <BubbleNode label="Phase 1" size="sm" color-class="bg-blue-500 text-white" @click="navigateTo('phase-1')" />
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[110%] pointer-events-auto">
                <BubbleNode label="Phase 2" size="sm" color-class="bg-blue-600 text-white" @click="navigateTo('phase-2')" />
              </div>
              <div class="absolute top-0 right-0 translate-x-[60%] -translate-y-[60%] pointer-events-auto">
                <BubbleNode label="Phase 3" size="sm" color-class="bg-blue-700 text-white" @click="navigateTo('phase-3')" />
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="relative z-20 
                  md:absolute md:bottom-20 md:right-20 lg:bottom-32 lg:right-32"
      >
        <div class="relative flex items-center justify-center">
          <BubbleNode 
            label="Multiverse Saga"
            color-class="bg-gradient-to-br from-red-600 to-red-900 text-white"
            size="lg"
            @click="toggleSaga('multiverse')"
            class="relative z-20"
          />

          <transition name="orbit">
            <div v-if="activeSagas.multiverse" class="absolute inset-0 z-10 pointer-events-none">
              <div class="absolute top-0 left-0 -translate-x-[60%] -translate-y-[60%] pointer-events-auto">
                <BubbleNode label="Phase 4" size="sm" color-class="bg-red-500 text-white" @click="navigateTo('phase-4')" />
              </div>
              <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[110%] pointer-events-auto">
                <BubbleNode label="Phase 5" size="sm" color-class="bg-red-600 text-white" @click="navigateTo('phase-5')" />
              </div>
              <div class="absolute top-0 right-0 translate-x-[60%] -translate-y-[60%] pointer-events-auto">
                <BubbleNode label="Phase 6" size="sm" color-class="bg-red-700 text-white" @click="navigateTo('phase-6')" />
              </div>
            </div>
          </transition>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.orbit-enter-active,
.orbit-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.orbit-enter-from,
.orbit-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(20px);
}

.orbit-enter-to,
.orbit-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>