import React from "react";
import { 
  FiBook, 
  FiCheckCircle, 
  FiLogOut, 
  FiUsers, 
  FiBookOpen, 
  FiRepeat, 
  FiClipboard 
} from "react-icons/fi";
import "../styles/layout.css";
import "../styles/table.css";

function StatCard({ label, value, color, icon, sub }) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "20px",
      borderLeft: `4px solid ${color}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        <span style={{ fontSize: "22px", color }}>{icon}</span>
      </div>
      <div style={{ fontSize: "30px", fontWeight: "700", color: "#0f172a", fontFamily: "'Playfair Display', serif" }}>{value}</div>
      {sub && <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>{sub}</div>}
    </div>
  );
}

function formatTgl(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function Dashboard({ buku, anggota, peminjaman, onNavigate }) {
  const totalBuku = buku.length;
  const tersedia = buku.filter((b) => b.status === "Tersedia").length;
  const dipinjam = buku.filter((b) => b.status === "Dipinjam").length;
  const aktifPinjam = peminjaman.filter((p) => p.status === "Dipinjam").length;

  const recentPeminjaman = [...peminjaman]
    .sort((a, b) => new Date(b.tanggalPinjam) - new Date(a.tanggalPinjam))
    .slice(0, 5);

  const getBukuJudul = (id) => buku.find((b) => b.id === id)?.judul || "-";
  const getAnggotaNama = (id) => anggota.find((a) => a.id === id)?.nama || "-";

  const badgeClass = (s) => {
    if (s === "Dipinjam") return "badge badge-dipinjam";
    if (s === "Dikembalikan") return "badge badge-dikembalikan";
    if (s === "Terlambat") return "badge badge-terlambat";
    return "badge badge-tersedia";
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Selamat datang di Sistem Manajemen Perpustakaan</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "24px" }}>
        <StatCard label="Total Buku" value={totalBuku} color="#3b82f6" icon={<FiBook />} sub="judul koleksi" />
        <StatCard label="Tersedia" value={tersedia} color="#10b981" icon={<FiCheckCircle />} sub="siap dipinjam" />
        <StatCard label="Sedang Dipinjam" value={dipinjam} color="#f59e0b" icon={<FiLogOut />} sub="buku keluar" />
        <StatCard label="Total Anggota" value={anggota.length} color="#8b5cf6" icon={<FiUsers />} sub="terdaftar" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "16px" }}>
        {/* Tabel peminjaman terbaru */}
        <div className="section-card">
          <div className="section-card-header">
            <span className="section-card-title">Peminjaman Terbaru</span>
            <button
              onClick={() => onNavigate("peminjaman")}
              style={{ background: "none", border: "none", color: "#2563eb", fontSize: "13px", cursor: "pointer", fontWeight: "500" }}
            >
              Lihat semua →
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Buku</th>
                <th>Anggota</th>
                <th>Tgl Pinjam</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPeminjaman.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={4}><span className="empty-icon"><FiClipboard /></span>Belum ada data</td>
                </tr>
              ) : (
                recentPeminjaman.map((p) => (
                  <tr key={p.id}>
                    <td><span className="td-title">{getBukuJudul(p.bukuId)}</span></td>
                    <td>{getAnggotaNama(p.anggotaId)}</td>
                    <td>{formatTgl(p.tanggalPinjam)}</td>
                    <td><span className={badgeClass(p.status)}>{p.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Panel kanan */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Aksi cepat */}
          <div className="section-card" style={{ padding: "18px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", marginBottom: "14px" }}>Aksi Cepat</div>
            {[
              { key: "buku", label: "Kelola Buku", sub: `${totalBuku} koleksi`, icon: <FiBookOpen />, bg: "#eff6ff", color: "#1d4ed8" },
              { key: "anggota", label: "Data Anggota", sub: `${anggota.length} terdaftar`, icon: <FiUsers />, bg: "#f5f3ff", color: "#6d28d9" },
              { key: "peminjaman", label: "Peminjaman", sub: `${aktifPinjam} aktif`, icon: <FiRepeat />, bg: "#fffbeb", color: "#b45309" },
            ].map((a) => (
              <button
                key={a.key}
                onClick={() => onNavigate(a.key)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px", width: "100%",
                  padding: "12px", borderRadius: "10px", border: "none",
                  background: a.bg, cursor: "pointer", marginBottom: "8px", textAlign: "left",
                }}
              >
                <span style={{ fontSize: "20px", color: a.color, display: "flex", alignItems: "center" }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: a.color }}>{a.label}</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "1px" }}>{a.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Progress stok */}
          <div className="section-card" style={{ padding: "18px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", marginBottom: "12px" }}>Stok Buku</div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Tersedia</span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#059669" }}>{tersedia}</span>
            </div>
            <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden", marginBottom: "12px" }}>
              <div style={{ height: "100%", width: `${totalBuku ? (tersedia / totalBuku) * 100 : 0}%`, background: "#10b981", borderRadius: "4px" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Dipinjam</span>
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#d97706" }}>{dipinjam}</span>
            </div>
            <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${totalBuku ? (dipinjam / totalBuku) * 100 : 0}%`, background: "#f59e0b", borderRadius: "4px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;