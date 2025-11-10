import api from './api'; // Impor "telepon" Axios kita

// --- FUNGSI PROFIL INDUSTRI ---
const getMyProfile = () => {
  return api.get('/industry/me');
};
const updateMyProfile = (data) => {
  return api.put('/industry/me', data);
};

// --- FUNGSI KEBUTUHAN (NEEDS) ---
const createNeed = (data) => {
  return api.post('/industry/needs', data);
};
const getMyNeeds = () => {
  return api.get('/industry/needs');
};

// === FUNGSI BARU UNTUK LANGKAH INI ===

// Memanggil GET /api/industry/needs/:id
const getNeedApplicants = (id) => {
  return api.get(`/industry/needs/${id}`);
};

// Memanggil PUT /api/industry/needs/:id/status
const updateNeedStatus = (id, status) => {
  return api.put(`/industry/needs/${id}/status`, { status });
};

const industryService = {
  getMyProfile,
  updateMyProfile,
  createNeed,
  getMyNeeds,
  getNeedApplicants,  // <-- Pastikan ini diekspor
  updateNeedStatus    // <-- Pastikan ini diekspor
};

export default industryService;