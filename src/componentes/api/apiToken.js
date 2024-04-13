import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Agrega un interceptor de solicitudes
api.interceptors.request.use(
  (config) => {
    // Obtén el token JWT del almacenamiento local o del estado
    const token = localStorage.getItem('token');

    // Si el token existe, agrega el encabezado Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;