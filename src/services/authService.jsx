import api from './api'; // Impor "telepon" Axios kita

// Fungsi ini akan memanggil endpoint POST /api/auth/register
// dengan membawa data registrasi
const register = (data) => {
  // data akan terlihat seperti: 
  // { email, password, role, nama_usaha }
  return api.post('/auth/register', data);
};

// Kita ekspor fungsi ini
const authService = {
  register,
};

export default authService;