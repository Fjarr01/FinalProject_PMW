import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import "../styles/modal.css";

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmtext }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box small" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon"><FiAlertTriangle /></div>
        <div className="confirm-title">{title || "Hapus Data?"}</div>
        <div className="confirm-text">{message || "Data yang dihapus tidak dapat dikembalikan."}</div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button className="btn-cancel" onClick={onClose}>Batal</button>
          <button className="btn-delete" onClick={onConfirm}>Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;