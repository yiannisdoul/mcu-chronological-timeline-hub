<script setup>
import { ref, onMounted } from 'vue';
import { getMoviePosterUrl } from '../../services/tmdb';

const props = defineProps({
  movie: Object,
  index: Number,
  isActive: Boolean
});

const posterUrl = ref(null);

onMounted(async () => {
  if (props.movie.tmdb_id) {
    posterUrl.value = await getMoviePosterUrl(props.movie.tmdb_id, props.movie.type);
  }
});
</script>

<template>
  <div 
    class="relative flex flex-col items-center transition-all duration-500 ease-out group"
    :class="[
      isActive ? 'scale-110 z-40 grayscale-0' : 'scale-90 grayscale opacity-60',
      'hover:grayscale-0 hover:opacity-100 hover:scale-105'
    ]"
    style="width: 160px;"
  >
    
    <div 
      class="hidden md:block absolute w-1.5 bg-red-600 transition-all duration-300 group-hover:bg-red-500 group-hover:shadow-[0_0_15px_red] group-hover:h-8"
      :class="[
        index % 2 === 0 ? 'top-full' : 'bottom-full', 
        isActive ? 'shadow-[0_0_15px_red] bg-red-500' : '',
        
        isActive ? 'h-8' : 'h-14'
      ]"
    ></div>

    <div 
      class="md:hidden absolute h-1.5 w-8 bg-red-600 top-1/2 -translate-y-1/2 transition-all duration-300"
      :class="[
        index % 2 === 0 ? '-right-8' : '-left-8', 
        isActive ? 'shadow-[0_0_15px_red] bg-red-500' : ''
      ]"
    ></div>

    <div class="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-2xl bg-gray-900 border-2 border-gray-800 z-10">
      <img 
        v-if="posterUrl" 
        :src="posterUrl" 
        :alt="movie.title" 
        class="w-full h-full object-cover"
        loading="lazy"
        draggable="false" 
      />
      <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500 p-2 text-center text-[10px]">
        {{ movie.title }}
      </div>
    </div>

    <div class="mt-3 text-center z-10">
      <h3 class="text-white font-bold text-xs leading-tight line-clamp-2 uppercase tracking-wide">{{ movie.title }}</h3>
      <span class="inline-block mt-1 px-2 py-0.5 rounded bg-red-600 text-[10px] text-white font-bold shadow-[0_0_10px_red]">
        {{ movie.date_in_universe }}
      </span>
    </div>

  </div>
</template>