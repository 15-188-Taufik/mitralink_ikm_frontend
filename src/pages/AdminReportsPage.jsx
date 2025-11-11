import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService'; 

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []); 

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Laporan Pendapatan IKM</h1>
      
      {message && (
        <p className="p-3 rounded mb-4 bg-red-100 text-red-700 text-sm">
          {message}
        </p>
      )}

      {/* Kontainer tabel agar responsif */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-8 text-center">Loading data...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500 p-8">
            Belum ada IKM yang melaporkan pendapatan.
          </p>
        ) : (
          /* Tambahkan div ini untuk scroll horizontal di mobile */
          <div className="overflow-x-auto">
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
                  <tr key={report.revenue_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.nama_usaha}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{report.bulan}/{report.tahun}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{formatCurrency(report.jumlah_pendapatan)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(report.tanggal_lapor).toLocaleDateString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReportsPage;