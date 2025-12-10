import axios from 'axios';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL;

const tmdbClient = axios.create({
  baseURL: baseUrl,
  params: { api_key: apiKey }
});

// Now accepts a second argument: 'type'
export const getMoviePosterUrl = async (tmdbId, type) => {
  if (!tmdbId) return null;

  // Determine the correct endpoint based on your JSON "type" field
  // If type is "Series", "Series-Break", or "Special", look in TV. Otherwise, Movie.
  const endpointType = (type && (type.includes('Series') || type === 'Special')) ? 'tv' : 'movie';

  try {
    const response = await tmdbClient.get(`/${endpointType}/${tmdbId}`);
    
    if (response.data.poster_path) {
      return `${imageBaseUrl}${response.data.poster_path}`;
    }
  } catch (error) {
    console.error(`Failed to fetch ${endpointType} with ID ${tmdbId}`, error);
  }
  return null;
};