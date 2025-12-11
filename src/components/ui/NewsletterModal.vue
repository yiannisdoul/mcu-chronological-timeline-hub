<script setup>
import { ref, onMounted } from 'vue';
import { subscribeToNewsletter } from '../../firebase';
import emailjs from '@emailjs/browser';

// Define the two ways this modal closes/notifies the parent (Badge)
const emit = defineEmits(['signed-up', 'close-modal']);

const email = ref("");
const status = ref("idle"); 
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const userTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; 
const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID; 
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Function to close the modal (Temporary closure via 'X')
const handleClose = () => {
    emit('close-modal');
};

// Function for 'Do not show this popup again' (Permanent dismissal)
const handlePermanentDismiss = () => {
    localStorage.setItem('marvel_newsletter_popup_dismiss', 'true');
    emit('close-modal');
};

const handleSubmit = async () => {
  if (!email.value || !email.value.includes('@')) return;
  status.value = "loading";
  
  const dbResult = await subscribeToNewsletter(email.value);

  if (dbResult.success) {
    if (dbResult.message !== 'Duplicate') {
        try {
            const templateParams = { 
                to_email: email.value,
                user_email: email.value,
                to_name: email.value.split('@')[0]
            };
            await emailjs.send(serviceId, userTemplateId, templateParams, publicKey);
            await emailjs.send(serviceId, adminTemplateId, templateParams, publicKey);
        } catch (err) {
            console.error("EmailJS Failed:", err);
        }
    }
    
    status.value = "success";
    // Set permanent sign-up flag
    localStorage.setItem('marvel_newsletter_signup', 'true');
    // Clear the popup dismissal flag, since they signed up
    localStorage.removeItem('marvel_newsletter_popup_dismiss'); 
    
    setTimeout(() => { 
        emit('signed-up', true); // Closes the modal and updates badge
    }, 2500);
  } else {
    status.value = "error";
  }
};
</script>

<template>
  <transition name="fade">
    <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      
      <div class="relative bg-gray-900 border border-gray-700 w-full max-w-md p-8 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.2)] text-center overflow-hidden">
        
        <button @click="handleClose" class="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl leading-none">&times;</button>

        <div v-if="status !== 'success'">
          <h2 class="text-2xl font-black text-white uppercase tracking-wider mb-2">Join the Multiverse</h2>
          <p class="text-gray-400 text-sm mb-6">Get the latest MCU timeline updates and feature releases directly to your inbox.</p>

          <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Enter your email" 
              required
              class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors placeholder-gray-600"
            />
            
            <button 
              type="submit" 
              :disabled="status === 'loading'"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
            >
              {{ status === 'loading' ? 'Subscribing...' : 'Assemble' }}
            </button>
          </form>

          <p v-if="status === 'error'" class="text-red-500 text-xs mt-3">Connection error. Please try again.</p>

          <button @click="handlePermanentDismiss" class="mt-4 text-xs text-gray-500 hover:text-white underline transition-colors">
            Do not show this popup again.
          </button>
        </div>

        <div v-else class="py-8 animate-pulse">
          <div class="text-5xl mb-4">🎉</div>
          <h3 class="text-xl font-bold text-white mb-2">Welcome to the Team!</h3>
          <p class="text-gray-400 text-sm">You have successfully subscribed.</p>
        </div>
        
        <div class="mt-6 pt-6 border-t border-gray-800 flex justify-center opacity-50 hover:opacity-100 transition-opacity">
           <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB" class="h-3 mr-2" />
           <p class="text-[10px] text-gray-500 text-left leading-tight">
             This product uses the TMDB API but is not endorsed or certified by TMDB.
           </p>
        </div>
      </div>
    </div>
  </transition>
</template>