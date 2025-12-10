import axios from 'axios';

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_URL;

const tmdbClient = axios.create({
  baseURL: baseUrl,
  params: { api_key: apiKey }
});

// New function to get full details for the Modal
export const getMovieDetails = async (tmdbId, type) => {
  if (!tmdbId) return null;

  // Determine the correct endpoint: 'tv' or 'movie'
  const endpointType = (type && (type.includes('Series') || type === 'Special')) ? 'tv' : 'movie';

  try {
    const response = await tmdbClient.get(`/${endpointType}/${tmdbId}`, {
        params: {
            // Requesting external data points for a richer detail view
            append_to_response: 'credits,external_ids' 
        }
    });
    
    // We combine the base TMDB data with a simplified cast list
    const details = response.data;
    const cast = details.credits.cast.slice(0, 5).map(c => c.name); // Get top 5 cast members

    return {
        // Common fields
        title: details.title || details.name,
        overview: details.overview,
        poster_path: details.poster_path,
        release_date: details.release_date || details.first_air_date,
        tagline: details.tagline,
        runtime: details.runtime || details.episode_run_time?.[0],

        // Specific fields
        genres: details.genres.map(g => g.name).join(', '),
        director: details.credits.crew.find(c => c.job === 'Director' || c.job === 'Creator')?.name,
        cast: cast,
    };

  } catch (error) {
    console.error(`Error fetching full details for ID ${tmdbId}:`, error);
    return null;
  }
};

// Existing function for the MovieCard poster remains the same
export const getMoviePosterUrl = async (tmdbId, type) => {
  if (!tmdbId) return null;

  const endpointType = (type && (type.includes('Series') || type === 'Special')) ? 'tv' : 'movie';

  try {
    const response = await tmdbClient.get(`/${endpointType}/${tmdbId}`);
    
    if (response.data.poster_path) {
      return `${imageBaseUrl}${response.data.poster_path}`;
    }
  } catch (error) {
    console.error(`Failed to fetch poster for ID ${tmdbId}`, error);
  }
  return null;
};