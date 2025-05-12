import axios from '@/api/axiosInstance';
import AUTH_ENDPOINTS from '@/api/endpoints/auth';

export const login = (email: string, password: string) => {
  return axios.post(AUTH_ENDPOINTS.login, { email, password });
};

export const refresh = () => {
  return axios.post(AUTH_ENDPOINTS.refresh);
};

export const createUser = (userData: {
  nome: string;
  email: string;
  password: string;
  avatarUrl: string;
}) => {
  return axios.post(AUTH_ENDPOINTS.createUser, userData);
};

export const getMe = () => {
  return axios.get(AUTH_ENDPOINTS.me);
};
