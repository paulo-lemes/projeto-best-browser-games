import axios from 'axios';

const fetchApi = axios.create({
  baseURL: 'https://api-best-browser-games.vercel.app',
});

export default fetchApi;