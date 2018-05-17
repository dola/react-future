import {createResource} from 'simple-cache-provider/cjs/simple-cache-provider.development';

// TMDB API: https://developers.themoviedb.org/3/

const TMDB_API_PATH = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY; // set your api key over an env variable

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

async function fetchConfig() {
  const response = await fetch(
    `${TMDB_API_PATH}/configuration?api_key=${TMDB_API_KEY}`,
  );
  return response.json();
}

export const readConfig = createResource(fetchConfig);

export async function searchMovies(query) {
  const response = await fetch(
    `${TMDB_API_PATH}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`,
  );
  return response.json();
}

export async function fetchMovie(id) {
  const response = await fetch(
    `${TMDB_API_PATH}/movie/${id}?api_key=${TMDB_API_KEY}`,
  );
  return response.json();
}

export async function fetchSimilarMovies(movieId) {
  const response = await fetch(
    `${TMDB_API_PATH}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`,
  );
  return response.json();
}

export function getImageUrl(path, imageWidth = 300) {
  return `${TMDB_IMAGE_BASE_URL}/w${imageWidth}/${path}`;
}
