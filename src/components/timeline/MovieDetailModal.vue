<script setup>
import { ref, watch } from 'vue';
import { getMovieDetails } from '../../services/tmdb';

const props = defineProps({
  movie: Object
});

const emit = defineEmits(['close']);
const details = ref(null);
const isLoading = ref(false);
const posterBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL;

const fetchData = async (movie) => {
  if (!movie || !movie.tmdb_id) return;
  details.value = null;
  isLoading.value = true;
  details.value = await getMovieDetails(movie.tmdb_id, movie.type);
  isLoading.value = false;
};

watch(() => props.movie, (newMovie) => {
  if (newMovie) fetchData(newMovie);
}, { immediate: true });

const formatRuntime = (runtime) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};
</script>

<template>
  <div @click.self="emit('close')" class="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
    
    <div class="bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
      
      <button @click="emit('close')" class="absolute top-4 right-4 text-white hover:text-red-500 text-3xl z-50 p-2 leading-none drop-shadow-md">&times;</button>

      <div v-if="isLoading" class="w-full h-96 flex items-center justify-center text-white text-xl">Loading Details...</div>

      <div v-else-if="details" class="flex flex-col md:flex-row h-full w-full overflow-hidden">
        
        <div class="md:w-1/3 flex-shrink-0 relative h-64 md:h-auto">
          <img v-if="details.poster_path" :src="`${posterBaseUrl}${details.poster_path}`" :alt="details.title" class="w-full h-full object-cover"/>
          <div class="md:hidden absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>

        <div class="md:w-2/3 p-6 md:p-8 overflow-y-auto flex-1 bg-gray-900">
          <h2 class="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-2 leading-tight">{{ details.title }}</h2>
          <p class="text-sm italic text-yellow-500 mb-4">{{ details.tagline }}</p>
          
          <div class="flex flex-wrap gap-2 text-xs font-semibold mb-6">
            <span v-if="details.runtime" class="bg-gray-800 px-3 py-1 rounded-full text-red-500 border border-red-900">{{ formatRuntime(details.runtime) }}</span>
            <span v-if="details.release_date" class="bg-gray-800 px-3 py-1 rounded-full text-white border border-gray-700">{{ details.release_date.substring(0, 4) }}</span>
            <span v-if="details.genres" class="bg-gray-800 px-3 py-1 rounded-full text-white border border-gray-700">{{ details.genres }}</span>
          </div>

          <div class="space-y-4 text-gray-300 pb-8">
            <div>
              <h3 class="text-white font-bold uppercase text-sm mb-1">Overview</h3>
              <p class="text-sm leading-relaxed">{{ details.overview }}</p>
            </div>
            <div v-if="details.director">
              <h3 class="text-white font-bold uppercase text-sm mb-1">Director / Creator</h3>
              <p class="text-sm text-yellow-500">{{ details.director }}</p>
            </div>
            <div v-if="details.cast.length">
              <h3 class="text-white font-bold uppercase text-sm mb-1">Cast</h3>
              <p class="text-sm">{{ details.cast.join(', ') }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>