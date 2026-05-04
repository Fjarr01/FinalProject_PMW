import React from "react";
import { FiHome, FiBookOpen, FiUsers, FiRepeat, FiBook } from "react-icons/fi";
import "../styles/layout.css";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: <FiHome /> },
  { key: "buku", label: "Data Buku", icon: <FiBookOpen /> },
  { key: "anggota", label: "Data Anggota", icon: <FiUsers /> },
  { key: "peminjaman", label: "Peminjaman", icon: <FiRepeat /> },
];

function Sidebar({ activePage, onNavigate, counts }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon"><FiBook /></div>
        <div>
          <div className="sidebar-logo-title">Pustaka Digital</div>
          <div className="sidebar-logo-sub">Management System</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${activePage === item.key ? "active" : ""}`}
            onClick={() => onNavigate(item.key)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {counts[item.key] !== undefined && (
              <span className="nav-badge">{counts[item.key]}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">© 2025 Pustaka Digital</div>
    </aside>
  );
}

export default Sidebar;