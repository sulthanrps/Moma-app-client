# Panduan Pengaksesan Sistem Moma (Money Management System) 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```


3. Scan QR Code (Alternatif via Expo Go)
   ```bash
   - Pastikan HP Android dan Laptop untuk run project terhubung ke jaringan Wi-Fi yang sama
   - Buka aplikasi Expo Go di HP Android.
   - Ketuk opsi "Scan QR Code".
   - Arahkan kamera ke QR Code yang ditampilkan di terminal/layar laptop mahasiswa.
   - Tunggu proses bundling JavaScript selesai (100%).
   ```

## Skenario Pengujian Fitur (User Walkthrough)


Berikut adalah langkah-langkah untuk menguji fitur utama aplikasi sesuai alur yang telah dikembangkan.

# Skenario 1: Melihat Riwayat & Menambah Transaksi

## Halaman Utama (Records):
```bash
1. Aplikasi akan menampilkan halaman home, pilih opsi 'record' pada bottom navigation bar

2. Aplikasi akan terbuka di halaman Riwayat Transaksi.

3. Perhatikan grafik ringkasan Income/Expenditure di bagian atas.

4. Gulir ke bawah untuk melihat daftar transaksi per tanggal.
```

## Menambah Transaksi Baru:
```bash
1. Ketuk tombol Floating Action Button (+) di pojok kanan bawah.

2. Pilih Tab Expenditure (Pengeluaran) atau Income (Pemasukan).

3. Isi Date (pilih tanggal via kalender).

4. Isi Amount (misal: 50000).

5. Pilih Wallet (misal: Daily Wallet).

6. Pilih Category (misal: Food).

7. Ketuk tombol Add.

Hasil: Muncul pop-up konfirmasi "Transaction has been added!". Klik Next untuk kembali.
```

# Skenario 2: Melakukan Transfer Dana

## Akses Menu Transfer:

Pada menu navigasi bawah (Bottom Tab), pilih tab Transfer.

## Tahap 1: Pilih Tujuan:
```bash 
1. Pilih Bank Tujuan (misal: BCA) dari dropdown.

2. Masukkan Nomor Rekening (misal: 1234567890).

3. Klik Next.
```

## Tahap 2: Input Nominal:
```bash
1. Masukkan nominal transfer (misal: 20000).

2. Uji Coba Validasi: Coba masukkan nominal melebihi saldo (misal: 5000000), akan muncul pesan error merah.

3. Fitur Secured Budget: Coba ganti sumber dana ke Emergency Wallet. Jika kuota habis (>3x), akan muncul peringatan merah.

4. Pilih Daily Budget Wallet dan klik Next.
```

## Tahap 3: Review & PIN:
```bash
1. Periksa ringkasan transaksi. Klik Pay Now.

2. Masukkan PIN: 000000 (Enam kali nol).

3. Hasil: Muncul animasi "Validating" (tunggu 3 detik), kemudian berubah menjadi "Success".

4. Klik Done dan anda akan diarahkan ke halaman riwayat transaksi
```

# Skenario 3: Mengatur Alokasi Dana (Secured Budget)

Fitur ini mensimulasikan pengaturan batas anggaran yang ketat.

## Akses Fitur:
```bash
Dari Halaman Utama, cari card ke menu Secured Budget.
```

## Melihat Alokasi Saat Ini:
```bash
Anda akan melihat kartu hijau dengan visualisasi Progress Bar untuk Daily, Emergency, dan Saving.
```

## Mengedit Alokasi:
```bash
1. Klik tombol Edit Allocations.

2. Masukkan persentase baru (Total harus 100%).

3. Uji Coba Validasi: Masukkan alokasi Emergency Budget di atas 30% (misal: 40%). Aplikasi akan menolak dan memunculkan pesan error.

4. Sesuaikan kembali agar valid, lalu klik Save Setting.

Hasil: Halaman utama alokasi akan memperbarui grafik batang sesuai input baru.
```

# 5. Catatan Penting (Known Limitations)
```bash
Mengingat ini adalah versi Prototype Front-end:

Data Persistensi: Data yang diinputkan (transaksi baru, ubah alokasi) tersimpan sementara di memori aplikasi. Jika aplikasi ditutup total (force close), data akan kembali ke kondisi awal (reset).

Koneksi Backend: Aplikasi belum terhubung ke database real-time (Supabase) sepenuhnya untuk fitur tertentu, sehingga menggunakan Mock Data (data simulasi) untuk demonstrasi antarmuka.

Keamanan PIN: Validasi PIN saat ini diset hardcoded ke 000000 untuk kemudahan pengujian.

Dokumen ini dibuat untuk memfasilitasi proses pengujian dan penilaian sistem Moma
```
