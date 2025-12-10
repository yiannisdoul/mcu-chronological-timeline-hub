// src/services/tmdb.js
import axios from 'axios';

// Access variables safely
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL;

const tmdbClient = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: apiKey
  }
});

export const getMoviePosterUrl = async (tmdbId) => {
  try {
    // We are only fetching the basic details to get the image path
    const response = await tmdbClient.get(`/movie/${tmdbId}`);
    
    if (response.data.poster_path) {
      return `${imageBaseUrl}${response.data.poster_path}`;
    }
    return null; // Handle missing poster
  } catch (error) {
    console.error(`Error fetching TMDB ID ${tmdbId}`, error);
    return null; // Return fallback placeholder in component
  }
};