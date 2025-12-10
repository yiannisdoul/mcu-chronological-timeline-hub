<script setup>
import { ref, watch } from 'vue';
import { getMovieDetails } from '../../services/tmdb';

const props = defineProps({
  movie: Object // The movie object from marvel_data.json
});

// Event definition for closing the modal
const emit = defineEmits(['close']);

const details = ref(null);
const isLoading = ref(false);

const posterBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL;

// Function to fetch and display data
const fetchData = async (movie) => {
  if (!movie || !movie.tmdb_id) return;
  
  details.value = null; // Clear old data
  isLoading.value = true;
  
  const fetchedDetails = await getMovieDetails(movie.tmdb_id, movie.type);
  details.value = fetchedDetails;
  
  isLoading.value = false;
};

// Watch for changes in the 'movie' prop (if a user clicks a different card while the modal is open)
watch(() => props.movie, (newMovie) => {
  if (newMovie) {
    fetchData(newMovie);
  }
}, { immediate: true }); // Fetch immediately on initial load

// Helper to format runtime display
const formatRuntime = (runtime) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};
</script>

<template>
  <div 
    @click.self="emit('close')"
    class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
  >
    
    <div 
      class="bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
      :class="{ 'scale-95': isLoading }"
    >
      
      <button 
        @click="emit('close')"
        class="absolute top-4 right-4 text-white hover:text-red-500 text-3xl z-10 p-2 leading-none"
      >
        &times;
      </button>

      <div v-if="isLoading" class="flex items-center justify-center h-96 text-white text-xl">
        Loading Details...
      </div>

      <div v-else-if="details" class="flex flex-col md:flex-row h-full">
        
        <div class="md:w-1/3 flex-shrink-0 relative overflow-hidden">
          <img 
            :src="`${posterBaseUrl}${details.poster_path}`" 
            :alt="details.title" 
            class="w-full h-full object-cover"
          />
        </div>

        <div class="md:w-2/3 p-8 overflow-y-auto">
          <h2 class="text-4xl font-black text-white leading-tight uppercase tracking-wider">{{ details.title }}</h2>
          <p class="text-sm italic text-yellow-500 mt-1 mb-4">{{ details.tagline }}</p>
          
          <div class="flex flex-wrap gap-4 text-sm font-semibold mb-6">
            <span class="bg-gray-800 px-3 py-1 rounded-full text-red-500">{{ formatRuntime(details.runtime) }}</span>
            <span class="bg-gray-800 px-3 py-1 rounded-full text-white">{{ details.release_date?.substring(0, 4) }}</span>
            <span class="bg-gray-800 px-3 py-1 rounded-full text-white">{{ details.genres }}</span>
          </div>

          <h3 class="text-xl font-bold text-white mb-2">Overview</h3>
          <p class="text-gray-300 text-base mb-6">{{ details.overview }}</p>

          <h3 class="text-xl font-bold text-white mb-2">Key Personnel</h3>
          <div class="text-gray-300 text-base space-y-1">
            <p><strong>Director/Creator:</strong> <span class="text-yellow-400">{{ details.director || 'N/A' }}</span></p>
            <p><strong>Starring:</strong> {{ details.cast.join(', ') || 'N/A' }}</p>
          </div>
        </div>

      </div>
      
      <div v-else class="flex items-center justify-center h-96 text-white text-xl">
          Details not found for this title.
      </div>

    </div>
  </div>
</template>