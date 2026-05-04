import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import BookList from "./components/BookList";
import AnggotaList from "./components/AnggotaList";
import PeminjamanList from "./components/PeminjamanList";
import useLocalStorage from "./hooks/useLocalStorage";
import { dummyBooks, dummyAnggota, dummyPeminjaman } from "./data/dummyBooks";
import "./styles/global.css";
import "./styles/layout.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [buku, setBuku] = useLocalStorage("perpus_buku", dummyBooks);
  const [anggota, setAnggota] = useLocalStorage("perpus_anggota", dummyAnggota);
  const [peminjaman, setPeminjaman] = useLocalStorage("perpus_peminjaman", dummyPeminjaman);

  const handleAddBuku = (data) => setBuku([...buku, data]);
  const handleEditBuku = (data) => setBuku(buku.map((b) => (b.id === data.id ? data : b)));
  const handleDeleteBuku = (id) => setBuku(buku.filter((b) => b.id !== id));

  const handleAddAnggota = (data) => setAnggota([...anggota, data]);
  const handleEditAnggota = (data) => setAnggota(anggota.map((a) => (a.id === data.id ? data : a)));
  const handleDeleteAnggota = (id) => setAnggota(anggota.filter((a) => a.id !== id));

  const handleAddPeminjaman = (data) => setPeminjaman([...peminjaman, data]);
  const handleEditPeminjaman = (data) => setPeminjaman(peminjaman.map((p) => (p.id === data.id ? data : p)));
  const handleDeletePeminjaman = (id) => setPeminjaman(peminjaman.filter((p) => p.id !== id));

  const counts = {
    buku: buku.length,
    anggota: anggota.length,
    peminjaman: peminjaman.length,
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard buku={buku} anggota={anggota} peminjaman={peminjaman} onNavigate={setActivePage} />;
      case "buku": return <BookList books={buku} onAdd={handleAddBuku} onEdit={handleEditBuku} onDelete={handleDeleteBuku} />;
      case "anggota": return <AnggotaList anggota={anggota} onAdd={handleAddAnggota} onEdit={handleEditAnggota} onDelete={handleDeleteAnggota} />;
      case "peminjaman": return <PeminjamanList peminjaman={peminjaman} buku={buku} anggota={anggota} onAdd={handleAddPeminjaman} onEdit={handleEditPeminjaman} onDelete={handleDeletePeminjaman} />;
      default: return null;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} counts={counts} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;