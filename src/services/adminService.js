import api from './api'; // Impor "telepon" Axios kita

// Memanggil GET /api/admin/unverified
const getUnverifiedIkms = () => {
  return api.get('/admin/unverified');
};

// Memanggil PUT /api/admin/verify/:id
const verifyIkm = (id) => {
  return api.put(`/admin/verify/${id}`);
};

// Memanggil GET /api/admin/reports/revenue
const getRevenueReports = () => {
  return api.get('/admin/reports/revenue');
};

const adminService = {
  getUnverifiedIkms,
  verifyIkm,
  getRevenueReports
};

export default adminService;