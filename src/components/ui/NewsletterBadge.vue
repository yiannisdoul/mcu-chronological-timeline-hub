<script setup>
import { ref, onMounted } from 'vue';
import NewsletterModal from './NewsletterModal.vue';

const isModalOpen = ref(false);
const isPermanentlySignedUp = ref(false); // New state to control badge visibility

onMounted(() => {
  // Check localStorage ONLY after the component is mounted to the DOM
  if (localStorage.getItem('marvel_newsletter_signup') === 'true') {
    isPermanentlySignedUp.value = true;
  }
  
  // Logic to auto-show the modal if the user is neither subscribed nor permanently dismissed
  const isPermanentlyDismissed = localStorage.getItem('marvel_newsletter_popup_dismiss');
  
  if (!isPermanentlySignedUp.value && !isPermanentlyDismissed) {
    // We auto-show it if the badge didn't already open it (i.e., we are the first render)
    setTimeout(() => { isModalOpen.value = true; }, 4000); 
  }
});

const openModal = () => {
  // If permanently signed up, clicking the badge does nothing.
  if (isPermanentlySignedUp.value) {
    return;
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Handles closing the modal and updating the permanent state
const handleModalClose = (isSignedUp) => {
    isModalOpen.value = false;
    if (isSignedUp) {
      isPermanentlySignedUp.value = true;
    }
};
</script>

<template>
  <div>
    <button 
      @click="openModal"
      :class="[
        'fixed bottom-4 left-4 z-[90] group flex items-center gap-2 backdrop-blur-md border rounded-full py-2 px-4 shadow-2xl transition-all duration-300 hover:scale-105',
        // Dynamic classes based on component state
        {'bg-red-800/80 border-red-500/30 hover:bg-red-600': !isPermanentlySignedUp},
        {'bg-gray-800/80 border-gray-500/30 cursor-default': isPermanentlySignedUp}
      ]"
    >
      <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
      <span class="text-xs font-bold text-white leading-none uppercase tracking-wide">
        {{ isPermanentlySignedUp ? 'Subscribed' : 'Updates' }}
      </span>
    </button>
    
    <NewsletterModal 
      v-if="isModalOpen" 
      @close-modal="closeModal" 
      @signed-up="handleModalClose"
    />
  </div>
</template>