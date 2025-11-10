import { Routes, Route } from 'react-router-dom';

// --- Impor Layout (Cetakan Halaman) ---
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout'; 
import DashboardIndustryLayout from './layouts/DashboardIndustryLayout'; 
import DashboardAdminLayout from './layouts/DashboardAdminLayout';

// --- Impor "Penjaga" ---
import ProtectedRoute from './components/ProtectedRoute';

// --- Impor Halaman Publik ---
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DirektoriPage from './pages/DirektoriPage';
import IkmDetailPage from './pages/IkmDetailPage';

// --- Impor Halaman Dashboard IKM ---
import DashboardIkmPage from './pages/DashboardIkmPage';
import IkmProfilePage from './pages/IkmProfilePage';
import IkmProductsPage from './pages/IkmProductsPage';
import IkmRevenuePage from './pages/IkmRevenuePage';
import IkmNeedsPage from './pages/IkmNeedsPage';

// --- Impor Halaman Dashboard Industri ---
import DashboardIndustryPage from './pages/DashboardIndustryPage';
import IndustryProfilePage from './pages/IndustryProfilePage';
import IndustryNeedsPage from './pages/IndustryNeedsPage';
import IndustryNeedDetailPage from './pages/IndustryNeedDetailPage';

// --- Impor Halaman Dashboard Admin ---
import DashboardAdminPage from './pages/DashboardAdminPage';
import AdminVerifyPage from './pages/AdminVerifyPage';
import AdminReportsPage from './pages/AdminReportsPage';

function App() {
  return (
    <Routes>
      
      {/* ======================================= */}
      {/* ==      RUTE PUBLIK (Siapa saja)     == */}
      {/* ======================================= */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} /> 
        <Route path="direktori" element={<DirektoriPage />} />
        <Route path="direktori/:id" element={<IkmDetailPage />} />
      </Route>
      
      {/* ======================================= */}
      {/* ==     RUTE TERPROTEKSI (IKM)        == */}
      {/* ======================================= */}
      <Route element={<ProtectedRoute allowedRoles={['ikm']} />}>
        <Route path="/dashboard-ikm" element={<DashboardLayout />}>
          <Route index element={<DashboardIkmPage />} />
          <Route path="profil" element={<IkmProfilePage />} />
          <Route path="produk" element={<IkmProductsPage />} />
          <Route path="pendapatan" element={<IkmRevenuePage />} />
          <Route path="kebutuhan" element={<IkmNeedsPage />} />
        </Route>
      </Route>

      {/* ======================================= */}
      {/* ==   RUTE TERPROTEKSI (INDUSTRI)     == */}
      {/* ======================================= */}
      <Route element={<ProtectedRoute allowedRoles={['industri']} />}>
        <Route path="/dashboard-industri" element={<DashboardIndustryLayout />}>
          <Route index element={<DashboardIndustryPage />} />
          <Route path="profil" element={<IndustryProfilePage />} />
          <Route path="kebutuhan" element={<IndustryNeedsPage />} />
          <Route path="kebutuhan/:id" element={<IndustryNeedDetailPage />} />
        </Route>
      </Route>

      {/* ======================================= */}
      {/* ==    RUTE TERPROTEKSI (ADMIN)       == */}
      {/* ======================================= */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard-admin" element={<DashboardAdminLayout />}>
          <Route index element={<DashboardAdminPage />} />
          <Route path="verifikasi" element={<AdminVerifyPage />} />
          <Route path="laporan" element={<AdminReportsPage />} />
        </Route>
      </Route>

      {/* (Nanti bisa ditambahkan Rute 404 Not Found di sini) */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}

    </Routes>
  );
}

export default App;