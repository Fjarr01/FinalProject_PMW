import React, { useState } from "react";
import { FiSearch, FiBookOpen, FiEdit2, FiTrash2, FiRepeat, FiCamera } from "react-icons/fi";
import { useZxing } from "react-zxing";
import PeminjamanForm from "./PeminjamanForm";
import ConfirmModal from "./ConfirmModal";
import "../styles/table.css";

function formatTgl(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function QRScanner({ onResult, onClose }) {
  const { ref } = useZxing({
    onDecodeResult: (result) => {
      onResult(result.getText());
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return (
    <div>
      <video 
        ref={ref} 
        style={{ 
          width: "100%", 
          borderRadius: "12px",
          maxHeight: "300px",
          objectFit: "cover"
        }} 
      />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button className="btn-cancel" onClick={onClose}>Tutup Kamera</button>
      </div>
    </div>
  );
}

function PeminjamanList({ peminjaman, buku, anggota, onAdd, onEdit, onDelete, onKembalikanBuku }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const getBuku = (id) => buku.find((b) => b.id === Number(id) || b.id === id);
  const getAnggota = (id) => anggota.find((a) => a.id === id);

  const filtered = peminjaman.filter((p) => {
    const b = getBuku(p.bukuId);
    const a = getAnggota(p.anggotaId);
    const matchSearch =
      b?.judul.toLowerCase().includes(search.toLowerCase()) ||
      a?.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleScan = (result) => {
    try {
      const parsed = JSON.parse(result);
      if (parsed.type === "BUKU" && parsed.id) {
        setShowScanner(false);
        
        const activePeminjaman = peminjaman.find(
          p => p.bukuId === parsed.id && p.status === "Dipinjam"
        );
        
        if (activePeminjaman) {
          if (window.confirm(`Kembalikan buku "${parsed.judul}"?`)) {
            onKembalikanBuku(activePeminjaman.id);
          }
        } else {
          alert("Buku ini tidak sedang dipinjam atau sudah dikembalikan.");
        }
      }
    } catch (e) {
      alert("QR Code tidak valid");
    }
  };

  const handleEdit = (data) => { setEditData(data); setShowForm(true); };
  const handleCloseForm = () => { setShowForm(false); setEditData(null); };
  const handleSave = (data) => {
    if (editData) onEdit({ ...data, id: editData.id });
    else onAdd({ ...data, id: "P" + String(peminjaman.length + 1).padStart(3, "0") });
    setEditData(null);
  };

  const badgeClass = (s) => {
    if (s === "Dipinjam") return "badge badge-dipinjam";
    if (s === "Dikembalikan") return "badge badge-dikembalikan";
    if (s === "Terlambat") return "badge badge-terlambat";
    return "badge";
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Data Peminjaman</h1>
        <p className="page-subtitle">Pantau aktivitas peminjaman buku perpustakaan</p>
      </div>

      <div className="section-card">
        <div className="toolbar">
          <div className="search-input-wrap">
            <span className="search-icon"><FiSearch /></span>
            <input 
              className="search-input" 
              placeholder="Cari buku, anggota, atau ID..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            {["Semua", "Dipinjam", "Dikembalikan", "Terlambat"].map((s) => <option key={s}>{s}</option>)}
          </select>
          
          <button 
            className="btn-primary" 
            onClick={() => setShowScanner(true)}
            style={{ background: "#059669" }}
          >
            <FiCamera /> Scan QR
          </button>
          
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ Tambah Peminjaman</button>
        </div>

        {showScanner && (
          <div className="modal-backdrop" onClick={() => setShowScanner(false)}>
            <div className="modal-box small" onClick={(e) => e.stopPropagation()} style={{ width: "400px" }}>
              <div className="confirm-title">Scan QR Buku</div>
              <div className="confirm-text">Arahkan kamera ke QR Code pada buku</div>
              
              <div style={{ margin: "20px 0" }}>
                <QRScanner 
                  onResult={handleScan} 
                  onClose={() => setShowScanner(false)}
                />
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}><FiRepeat /></div>
            <div>Tidak ada data peminjaman</div>
          </div>
        ) : (
          <div className="peminjaman-list">
            {filtered.map((p) => {
              const b = getBuku(p.bukuId);
              const a = getAnggota(p.anggotaId);
              return (
                <div key={p.id} className="peminjaman-row">
                  <div className="peminjaman-icon"><FiBookOpen /></div>
                  <div className="peminjaman-info">
                    <div className="peminjaman-buku">{b?.judul || "Buku tidak ditemukan"}</div>
                    <div className="peminjaman-meta">{p.id} · {a?.nama || "Anggota tidak ditemukan"}</div>
                  </div>
                  <div className="peminjaman-dates">
                    <div>{formatTgl(p.tanggalPinjam)}</div>
                    <div>s/d {formatTgl(p.tanggalKembali)}</div>
                  </div>
                  <div style={{ marginLeft: "12px" }}>
                    <span className={badgeClass(p.status)}>{p.status}</span>
                  </div>
                  <div className="action-btns" style={{ marginLeft: "8px" }}>
                    <button className="btn-icon edit" onClick={() => handleEdit(p)} title="Edit"><FiEdit2 /></button>
                    <button className="btn-icon del" onClick={() => setDeleteId(p.id)} title="Hapus"><FiTrash2 /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PeminjamanForm isOpen={showForm} onClose={handleCloseForm} onSave={handleSave} editData={editData} buku={buku} anggota={anggota} />
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => { onDelete(deleteId); setDeleteId(null); }} title="Hapus Peminjaman?" message="Data peminjaman ini akan dihapus secara permanen." />
    </div>
  );
}

export default PeminjamanList;