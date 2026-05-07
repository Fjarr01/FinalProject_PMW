export const dummyUsers = [
  {
    id: "U001",
    username: "admin",
    password: "admin123",
    nama: "administrator",
    role: "admin",
    email: "admin@pustaka.id",
    avatar: "AD"
  }
];

export const dummyBooks = [
{
    id: 1,
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    tahun: 2005,
    genre: "Fiksi",
    halaman: 529,
    deskripsi: "Kisah inspiratif anak-anak di Belitong yang berjuang untuk mendapatkan pendidikan.",
    status: "Dipinjam",
  },
  {
    id: 2,
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    tahun: 1980,
    genre: "Sejarah",
    halaman: 535,
    deskripsi: "Novel ini menceritakan perjuangan umat manusia di era kolonial.",
    status: "Tersedia",
  },
  {
    id: 3,
    judul: "Negeri 5 Menara",
    penulis: "Ahmad Fuadi",
    tahun: 2009,
    genre: "Sains",
    halaman: 423,
    deskripsi: "Cerita tentang Alif yang melanjutkan pendidikan di pesantren modern.",
    status: "Tersedia",
  },
  {
    id: 4,
    judul: "Filosofi Teras",
    penulis: "Henry Manampiring",
    tahun: 2018,
    genre: "Non-Fiksi",
    halaman: 320,
    deskripsi: "Panduan hidup berdasarkan filsafat Stoa untuk menghadapi masalah sehari-hari.",
    status: "Tersedia",
  },
  {
    id: 5,
    judul: "Sapiens",
    penulis: "Yuval Noah Harari",
    tahun: 2011,
    genre: "Sejarah",
    halaman: 512,
    deskripsi: "Sejarah singkat umat manusia dari zaman batu hingga era modern.",
    status: "Tersedia",
  },
];

export const dummyAnggota = [
  {
    id: "A001",
    nama: "Rina Astuti",
    email: "rina.astuti@email.com",
    telepon: "082112345678",
    alamat: "Jl. Malioboro No. 10, Yogyakarta",
    tanggalDaftar: "2024-01-15",
  },
  {
    id: "A002",
    nama: "Budi Santoso",
    email: "budi.santoso@email.com",
    telepon: "081234567890",
    alamat: "Jl. Parangtritis No. 5, Yogyakarta",
    tanggalDaftar: "2024-02-20",
  },
  {
    id: "A003",
    nama: "Citra Dewi",
    email: "citra.dewi@email.com",
    telepon: "089876543210",
    alamat: "Jl. Kaliurang Km. 8, Yogyakarta",
    tanggalDaftar: "2024-03-10",
  },
  {
    id: "A004",
    nama: "Dimas Pratama",
    email: "dimas.pratama@email.com",
    telepon: "085678901234",
    alamat: "Jl. Solo No. 22, Yogyakarta",
    tanggalDaftar: "2024-04-05",
  },
];

export const dummyPeminjaman = [
  {
    id: "P001",
    bukuId: 1,
    anggotaId: "A001",
    tanggalPinjam: "2025-04-15",
    tanggalKembali: "2025-04-29",
    status: "Dipinjam",
  },
  {
    id: "P002",
    bukuId: 2,
    anggotaId: "A002",
    tanggalPinjam: "2025-04-20",
    tanggalKembali: "2025-05-04",
    status: "Dikembalikan",
  },
  {
    id: "P003",
    bukuId: 3,
    anggotaId: "A003",
    tanggalPinjam: "2025-04-28",
    tanggalKembali: "2025-05-12",
    status: "Dipinjam",
  },
];