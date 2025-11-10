import axios from 'axios';

// 1. Tentukan alamat Backend API Anda.
const API_URL = 'http://localhost:5000/api'; 

// 2. Buat "instance" axios
const api = axios.create({
  baseURL: API_URL,
});

// 3. (BAGIAN KRUSIAL) Pastikan Anda memiliki kode "Interceptor" ini
// Ini yang otomatis menambahkan 'Bearer Token' ke panggilan Anda
api.interceptors.request.use(
  (config) => {
    // Ambil token dari Local Storage
    const token = localStorage.getItem('token');
    if (token) {
      // Jika token ada, tambahkan ke header 'Authorization'
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;