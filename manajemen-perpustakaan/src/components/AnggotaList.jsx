import React, { useState } from "react";
import { 
  FiSearch, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiEdit2, 
  FiTrash2, 
  FiUsers 
} from "react-icons/fi";
import AnggotaForm from "./AnggotaForm";
import ConfirmModal from "./ConfirmModal";
import "../styles/table.css";

function getInitials(nama) {
  return nama.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatTgl(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function AnggotaList({ anggota, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = anggota.filter((a) => //input anggota berdasarkan nama, email, id
    a.nama.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (data) => { setEditData(data); setShowForm(true); };
  const handleCloseForm = () => { setShowForm(false); setEditData(null); };
  const handleSave = (data) => {
    if (editData) onEdit({ ...data, id: editData.id });
    else onAdd({ ...data, id: "A" + String(anggota.length + 1).padStart(3, "0") });
    setEditData(null);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Data Anggota</h1>
        <p className="page-subtitle">Kelola data anggota perpustakaan</p>
      </div>

      <div className="section-card">
        <div className="toolbar">
          <div className="search-input-wrap">
            <span className="search-icon"><FiSearch /></span>
            <input 
              className="search-input" 
              placeholder="Cari nama, email, atau ID..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ Tambah Anggota</button>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}><FiUsers /></div>
            <div>Tidak ada data anggota</div>
          </div>
        ) : (
          <div className="anggota-grid">
            {filtered.map((a) => (
              <div key={a.id} className="anggota-card">
                <div className="anggota-avatar">{getInitials(a.nama)}</div>
                <div className="anggota-name">{a.nama}</div>
                <div className="anggota-id">ID: {a.id}</div>
                {a.email && (
                  <div className="anggota-info">
                    <span><FiMail /></span>
                    <span>{a.email}</span>
                  </div>
                )}
                {a.telepon && (
                  <div className="anggota-info">
                    <span><FiPhone /></span>
                    <span>{a.telepon}</span>
                  </div>
                )}
                {a.alamat && (
                  <div className="anggota-info">
                    <span><FiMapPin /></span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {a.alamat}
                    </span>
                  </div>
                )}
                {a.tanggalDaftar && (
                  <div className="anggota-info">
                    <span><FiCalendar /></span>
                    <span>Daftar: {formatTgl(a.tanggalDaftar)}</span>
                  </div>
                )}
                <div className="anggota-actions">
                  <button className="btn-icon edit" onClick={() => handleEdit(a)} style={{ flex: 1, fontSize: "12px" }}>
                    <FiEdit2 /> Edit
                  </button>
                  <button className="btn-icon del" onClick={() => setDeleteId(a.id)} style={{ flex: 1, fontSize: "12px" }}>
                    <FiTrash2 /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnggotaForm isOpen={showForm} onClose={handleCloseForm} onSave={handleSave} editData={editData} />
      <ConfirmModal 
        isOpen={!!deleteId} //untuk menghapus data anggota
        onClose={() => setDeleteId(null)} 
        onConfirm={() => { onDelete(deleteId); setDeleteId(null); }} 
        title="Hapus Anggota?" 
        message="Data anggota ini akan dihapus secara permanen." 
      />
    </div>
  );
}

export default AnggotaList;