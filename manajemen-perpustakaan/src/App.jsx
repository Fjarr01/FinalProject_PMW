import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import BookList from "./components/BookList";
import AnggotaList from "./components/AnggotaList";
import PeminjamanList from "./components/PeminjamanList";
import LoginPage from "./components/LoginPage";
import useLocalStorage from "./hooks/useLocalStorage";
import { dummyUsers, dummyBooks, dummyAnggota, dummyPeminjaman } from "./data/dummyBooks";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/table.css";
import "./styles/modal.css";

function App() {
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("perpus_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoginLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("perpus_user");
    setUser(null);
    setActivePage("dashboard");
  };

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

  const handleKembalikanBuku = (peminjamanId, isTerlambat = false) => {
    const now = new Date().toISOString().split("T")[0];
    
    setPeminjaman(peminjaman.map((p) => {
      if (p.id === peminjamanId) {
        return { 
          ...p, 
          status: isTerlambat ? "Terlambat" : "Dikembalikan",
          tanggalKembali: now
        };
      }
      return p;
    }));
    
    alert(isTerlambat ? "Buku dikembalikan dengan status terlambat!" : "Buku berhasil dikembalikan!");
  };

  const counts = {
    buku: buku.length,
    anggota: anggota.length,
    peminjaman: peminjaman.length,
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard buku={buku} anggota={anggota} peminjaman={peminjaman} onNavigate={setActivePage} />;
      case "buku":
        return <BookList 
          books={buku} 
          peminjaman={peminjaman} 
          onAdd={handleAddBuku} 
          onEdit={handleEditBuku} 
          onDelete={handleDeleteBuku} 
        />;
      case "anggota":
        return <AnggotaList anggota={anggota} onAdd={handleAddAnggota} onEdit={handleEditAnggota} onDelete={handleDeleteAnggota} />;
      case "peminjaman":
        return <PeminjamanList 
          peminjaman={peminjaman} 
          buku={buku} 
          anggota={anggota} 
          onAdd={handleAddPeminjaman} 
          onEdit={handleEditPeminjaman} 
          onDelete={handleDeletePeminjaman}
          onKembalikanBuku={handleKembalikanBuku}
        />;
      default:
        return null;
    }
  };

  if (loginLoading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
        fontSize: "14px"
      }}>
        Memuat...
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        counts={counts}
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;