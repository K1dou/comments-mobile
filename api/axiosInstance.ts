import { get } from '@/storage';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://comments-api-c43806001036.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use(async (config) => {
  const tokenMobile = await get('token');

  if (tokenMobile) {
    config.headers.Authorization = `Bearer ${tokenMobile}`;
  }
  return config;
});
