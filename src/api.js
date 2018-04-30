// TMDB API: https://developers.themoviedb.org/3/

const TMDB_API_PATH = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '00e139cee8bd741b03785ab5b22aca5c';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

async function fetchConfig() {
  const response = await fetch(
    `${TMDB_API_PATH}/configuration?api_key=${TMDB_API_KEY}`,
  );
  return await response.json();
}

async function searchMovies(query) {
  const response = await fetch(
    `${TMDB_API_PATH}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&include_adult=false`,
  );
  return await response.json();
}

async function fetchMovie(id) {
  const response = await fetch(
    `${TMDB_API_PATH}/movie/${id}?api_key=${TMDB_API_KEY}`,
  );
  return await response.json();
}

async function fetchReviews(movieId) {
  const response = await fetch(
    `${TMDB_API_PATH}/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`,
  );
  return await response.json();
}

async function fetchSimilarMovies(movieId) {
  const response = await fetch(
    `${TMDB_API_PATH}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`,
  );
  return await response.json();
}

export function getImageUrl(path, imageWidth = 300) {
  return `${TMDB_IMAGE_BASE_URL}/w${imageWidth}/${path}`;
}
