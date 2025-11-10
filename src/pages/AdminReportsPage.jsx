import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService'; // Impor "telepon" Admin

const AdminReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await adminService.getRevenueReports();
      setReports(response.data);
    } catch (error) {
      console.error('Gagal mengambil data laporan', error);
      setMessage('Gagal memuat data laporan pendapatan.');
    } finally {
      // PERBAIKAN BUG "LOADING..."
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []); 

  // Fungsi untuk format mata uang
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Laporan Pendapatan IKM</h1>
      
      {message && (
        <p className="p-3 rounded mb-4 bg-red-100 text-red-700">
          {message}
        </p>
      )}

      {/* Tabel Laporan */}
      <div className="bg-white shadow-md rounded p-8">
        {loading ? (
          <p>Loading data...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada IKM yang melaporkan pendapatan.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Usaha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Pendapatan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lapor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.revenue_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{report.nama_usaha}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{report.bulan}/{report.tahun}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{formatCurrency(report.jumlah_pendapatan)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.tanggal_lapor).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReportsPage;