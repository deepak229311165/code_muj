import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const problems = {
  getAll: (params?: { category?: string; difficulty?: string }) =>
    api.get('/problems', { params }),
  getById: (id: string) => api.get(`/problems/${id}`),
  create: (data: any) => api.post('/problems', data),
  update: (id: string, data: any) => api.put(`/problems/${id}`, data),
  delete: (id: string) => api.delete(`/problems/${id}`),
};

export default api; 