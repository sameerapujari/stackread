import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Gemini can take a while
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with an error
      const message = error.response.data?.error || 'Something went wrong';
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Server is not responding. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

export async function analyzeRepository(url) {
  const { data } = await api.post('/api/analyze', { url });
  return data;
}
