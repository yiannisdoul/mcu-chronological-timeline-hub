<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// Import the JSON list you created earlier
import allMovies from '../../data/marvel_data.json';

const route = useRoute();
// Capture the filter from the URL (e.g., 'phase-1')
const filterType = route.params.filter;

// Computed Property: Filters the master list based on the route
const filteredMovies = computed(() => {
  console.log("Filtering for:", filterType); // Debugging check
  
  // 1. Ultimate Order (Show Everything)
  if (filterType === 'super-chrono') {
    return allMovies;
  }
  
  // 2. Saga Filtering (e.g. 'infinity')
  if (filterType === 'infinity' || filterType === 'multiverse') {
    // Note: Our JSON uses capitalized 'Infinity'/'Multiverse', so we capitalize the first letter
    const sagaKey = filterType.charAt(0).toUpperCase() + filterType.slice(1);
    return allMovies.filter(m => m.saga === sagaKey);
  }
  
  // 3. Phase Filtering (e.g. 'phase-1')
  if (filterType.includes('phase')) {
    const phaseNum = filterType.split('-')[1]; // Get the number '1'
    
    // Handle Special 'Prequel' or 'Multiverse' phases for non-MCU
    // For standard phases, convert to integer
    if (!isNaN(phaseNum)) {
       return allMovies.filter(m => m.phase == phaseNum);
    }
  }
  
  // Fallback
  return allMovies;
});
</script>

<template>
  <div class="p-10 text-white">
    <div class="mb-10">
      <h1 class="text-4xl font-bold uppercase text-yellow-500 mb-2">{{ filterType }} Timeline</h1>
      <router-link to="/" class="text-sm text-gray-400 hover:text-white underline">← Back to Hub</router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="movie in filteredMovies" 
        :key="movie.id"
        class="border border-gray-800 p-4 rounded bg-gray-900"
      >
        <h3 class="font-bold text-lg">{{ movie.title }}</h3>
        <p class="text-sm text-gray-500">{{ movie.date_in_universe }}</p>
        <p class="text-xs text-blue-400 mt-2">Phase: {{ movie.phase }}</p>
      </div>
    </div>
  </div>
</template>