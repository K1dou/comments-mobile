import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://comments-api-c43806001036.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
