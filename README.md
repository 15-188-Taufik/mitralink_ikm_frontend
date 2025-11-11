# 🔗 MitraLink IKM - Frontend

## ✨ Outline Proyek

Repositori ini berisi kode sumber untuk **Frontend MitraLink IKM**, yang dibangun menggunakan **React (Vite)**. Aplikasi ini berfungsi sebagai antarmuka pengguna untuk berinteraksi dengan layanan Backend (API) yang sudah dideploy di Railway.

Tujuan utama dari alur kerja ini adalah untuk memastikan pengembangan lokal yang cepat dan deployment otomatis (Continuous Deployment) melalui Vercel setiap kali ada *push* ke repositori ini.

---

## 🛠️ Persiapan Lingkungan Lokal

Untuk memulai pengembangan, Anda hanya perlu menjalankan *frontend* karena *backend* sudah disediakan dan *online*.

### 1. Kebutuhan Terminal

Anda membutuhkan **satu terminal** yang berfokus pada folder *frontend* untuk menjalankan *developer server* React.

| Terminal | Lokasi | Perintah | Tujuan |
| :--- | :--- | :--- | :--- |
| **Terminal 2** | `frontend/` | `npm run dev` | Menjalankan frontend React di **http://localhost:5173** dan melihat perubahan secara *real-time*. |

> **⚠️ Catatan:** Backend sudah online. Anda **TIDAK PERLU** menjalankan `npm run dev` di folder backend.

---

## 🌍 Konfigurasi Variabel Lingkungan

Langkah ini **KRUSIAL** untuk menghubungkan *frontend* lokal Anda ke *backend* yang telah di-deploy.

### 1. Buat File `.env.development`

Di dalam *root folder* **`frontend/`**, buat file baru bernama `.env.development`.

### 2. Isi File


Tambahkan URL API *backend* yang sudah di-deploy ke dalam file tersebut:

```bash
# Alamat API Backend yang sudah dideploy di Railway
VITE_API_URL=[https://mitralinkikmbackend-production.up.railway.app/api](https://mitralinkikmbackend-production.up.railway.app/api)
```
### 3. Jalankan frontend 
Pastikan Anda berada di direktori frontend/, lalu jalankan:
```bash
npm run dev
```
Frontend Anda sekarang akan berjalan di localhost:5173, mengambil semua data (login, produk, dll.) langsung dari backend yang online.

## Alur Kerja Commit & Auto-Deploy (Vercel)
Vercel telah dikonfigurasi untuk secara otomatis redeploy situs setiap kali ada perubahan yang didorong (push) ke repositori ini.
**Langkah A: Lakukan Perubahan Lokal**
<ol>
<li>Buka file-file frontend (misal: src/pages/HomePage.jsx).</li>
<li>Lakukan perubahan tampilan (misal: ganti warna, ubah teks, tambahkan fitur).</li>
<li>Periksa hasilnya secara lokal di http://localhost:5173/.</li>
</ol>

**Langkah B: Commit dan Push Perubahan**
Setelah puas dengan perubahan, gunakan terminal (di folder frontend/ atau root proyek) untuk mengirim perubahan:
```bash
# 1. Stage Files: Tambahkan semua file yang berubah
git add .

# 2. Commit: Simpan perubahan secara lokal dengan pesan deskriptif
git commit -m "UI: <Pesan deskriptif Anda di sini, e.g., Perbaikan styling Navbar>"

# 3. Push: Kirim commit ke repositori GitHub frontend Anda
git push
```
**Langkah C: Verifikasi Auto-Deploy**
<ol>
<li>Setelah Anda menjalankan git push, Vercel akan otomatis mendeteksi commit baru.</li>
<li>Buka Dashboard Vercel Anda untuk melihat status deployment berubah dari "Ready" menjadi "Building...".</li>
<li>Setelah status kembali ke "Ready" (biasanya 1-2 menit), website online Anda (https://mitralink-frontend.vercel.app) akan langsung menampilkan perubahan yang baru Anda buat.</li>
</ol>

**Ulangi Langkah B setiap kali Anda ingin perubahan Anda tampil online.**

