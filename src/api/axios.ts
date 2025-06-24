import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5222/api', // ✅ Match your backend
});

// 🔐 Automatically attach token from localStorage to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
