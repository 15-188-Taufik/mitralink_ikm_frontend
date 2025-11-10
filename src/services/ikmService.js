import api from './api';

// --- FUNGSI PROFIL IKM (Private) ---
const getMyProfile = () => { return api.get('/ikm/me'); };
const updateMyProfile = (data) => { return api.put('/ikm/me', data); };
const updateMyProfilePicture = (formData) => { return api.put('/ikm/profile-picture', formData); };

// --- FUNGSI PRODUK IKM (Private) ---
const addProduct = (formData) => { return api.post('/ikm/products', formData); };
const getMyProducts = () => { return api.get('/ikm/products'); };

// --- FUNGSI PENDAPATAN IKM (Private) ---
const addRevenue = (data) => { return api.post('/ikm/revenues', data); };

// --- FUNGSI KEBUTUHAN (Private) ---
const getAllOpenNeeds = () => {
  return api.get('/ikm/needs'); 
};

// === TAMBAHKAN FUNGSI BARU INI ===
// Memanggil POST /api/ikm/needs/:id/apply
const applyToNeed = (needId, message) => {
  // data berisi { message: "pesan lamaran saya" }
  return api.post(`/ikm/needs/${needId}/apply`, { message });
};

// === FUNGSI PUBLIK ===
const getVerifiedIkms = () => { return api.get('/ikm'); };
const getPublicIkmById = (id) => { return api.get(`/ikm/${id}`); };
const getUnggulanIkms = () => { return api.get('/ikm/unggulan'); };

const ikmService = {
  // Private
  getMyProfile,
  updateMyProfile,
  updateMyProfilePicture,
  addProduct,
  getMyProducts,
  addRevenue,
  getAllOpenNeeds,
  applyToNeed, // <-- Pastikan ini diekspor
  // Public
  getVerifiedIkms,
  getPublicIkmById,
  getUnggulanIkms
};

export default ikmService;