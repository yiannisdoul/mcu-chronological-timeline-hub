<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'; // Added nextTick
import { useRoute } from 'vue-router';
import gsap from 'gsap'; // Added GSAP
import allMovies from '../../data/marvel_data.json';
import MovieCard from './MovieCard.vue';
import MovieDetailModal from './MovieDetailModal.vue';

const route = useRoute();
const filterType = route.params.filter;
const containerRef = ref(null);
const activeMovieId = ref(null);
let observer = null;
let resizeObserver = null;

// --- MODAL STATE ---
const selectedMovie = ref(null);
const isModalOpen = computed(() => selectedMovie.value !== null);

const openModal = (movie) => {
  selectedMovie.value = movie;
};
const closeModal = () => {
  selectedMovie.value = null;
};

// 1. FILTERING
const filteredMovies = computed(() => {
  if (filterType === 'super-chrono') return allMovies;
  if (filterType === 'infinity' || filterType === 'multiverse') {
    return allMovies.filter(m => m.saga && m.saga.toLowerCase() === filterType.toLowerCase());
  }
  if (filterType.includes('phase')) {
    const phaseNum = filterType.split('-')[1];
    return allMovies.filter(m => m.phase == phaseNum);
  }
  return allMovies;
});

// 2. INTERSECTION OBSERVER
const initObserver = () => {
  if (observer) observer.disconnect();

  const isDesktop = window.innerWidth >= 768;
  const rootMargin = isDesktop 
    ? '0px -50% 0px -50%'   
    : '-40% 0px -40% 0px';  

  const options = {
    root: containerRef.value,
    rootMargin: rootMargin,
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeMovieId.value = parseInt(entry.target.dataset.id);
      }
    });
  }, options);

  const anchors = document.querySelectorAll('.observer-target');
  anchors.forEach(anchor => observer.observe(anchor));
};

onMounted(async () => {
  // Wait for the DOM to update so elements exist
  await nextTick();
  
  // 3. ANIMATION: GSAP STAGGER
  // This selects all cards and animates them from hidden/low to visible/place
  gsap.from('.movie-card-wrapper', {
    duration: 0.8,
    opacity: 0,
    y: 100, // Cards slide up from 100px down
    scale: 0.8, // Cards grow slightly
    stagger: 0.05, // 0.05 seconds delay between each card (The "Cascade")
    ease: 'back.out(1.7)', // Gives it a slight "bouncy" pop
    delay: 0.2
  });

  // Animate the Center Line growing
  gsap.from('.central-line', {
    duration: 1.5,
    scaleY: 0, // Starts with 0 height
    transformOrigin: 'top center',
    ease: 'power3.out',
    delay: 0
  });

  // Initialize Logic
  setTimeout(initObserver, 100);
  resizeObserver = new ResizeObserver(() => {
    initObserver();
  });
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (resizeObserver) resizeObserver.disconnect();
});

// 4. MOUSE WHEEL (Desktop)
const handleWheel = (evt) => {
  if (window.innerWidth >= 768 && containerRef.value && evt.deltaY !== 0) {
    evt.preventDefault();
    containerRef.value.scrollLeft += evt.deltaY * 3; 
  }
};
</script>

<template>
  <div 
    ref="containerRef"
    @wheel="handleWheel"
    class="relative h-screen w-screen bg-black no-scrollbar 
           overflow-y-auto overflow-x-hidden snap-y snap-mandatory
           md:overflow-x-auto md:overflow-y-hidden md:snap-x md:snap-mandatory md:scroll-auto"
  >
    
    <div class="fixed top-0 left-0 w-full p-4 z-40 bg-gradient-to-b from-black via-black/90 to-transparent md:bg-none md:w-auto md:p-6 pointer-events-none">
      <div class="pointer-events-auto">
        <router-link to="/" class="text-white/50 hover:text-white uppercase tracking-widest text-[10px] font-bold">← Hub</router-link>
        <h1 class="text-3xl font-black text-white italic uppercase shadow-black drop-shadow-lg leading-none">
          {{ filterType.replace('-', ' ') }}
        </h1>
      </div>
    </div>

    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white bg-red-600 z-50 shadow-[0_0_20px_white] pointer-events-none"></div>

    <div class="hidden md:flex flex-row items-center h-full px-[50vw] w-max relative pt-0">
      
      <div class="absolute top-1/2 left-0 w-full h-1.5 bg-white -translate-y-1/2 z-0 shadow-[0_0_15px_white]"></div>

      <div 
        v-for="(movie, index) in filteredMovies" 
        :key="movie.id"
        class="movie-card-wrapper relative px-12 inline-block align-middle snap-center cursor-pointer"
        @click="openModal(movie)"
      >
        <div 
          class="observer-target absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0"
          :data-id="movie.id"
        ></div>

        <div :class="index % 2 === 0 ? '-translate-y-48' : 'translate-y-48'">
          <MovieCard 
            :movie="movie" 
            :index="index" 
            :isActive="activeMovieId === movie.id"
          />
        </div>

      </div>
    </div>

    <div class="md:hidden relative w-full min-h-screen py-[50vh] flex flex-col gap-24">
      <div class="absolute top-0 left-1/2 h-full w-1.5 bg-white -translate-x-1/2 z-0 shadow-[0_0_15px_white]"></div>
      
      <div 
        v-for="(movie, index) in filteredMovies" 
        :key="movie.id"
        class="movie-card-wrapper relative grid grid-cols-2 w-full snap-center cursor-pointer"
        @click="openModal(movie)"
      >
        <div class="observer-target absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2" :data-id="movie.id"></div>

        <div v-if="index % 2 === 0" class="col-span-1 flex justify-end pr-8">
           <MovieCard :movie="movie" :index="index" :isActive="activeMovieId === movie.id" />
        </div>
        <div v-if="index % 2 !== 0" class="col-start-2 flex justify-start pl-8">
           <MovieCard :movie="movie" :index="index" :isActive="activeMovieId === movie.id" />
        </div>
      </div>
    </div>

    <MovieDetailModal 
      v-if="isModalOpen" 
      :movie="selectedMovie" 
      @close="closeModal" 
    />

  </div>
</template>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>