import React from "react";
import { QRCodeSVG } from "qrcode.react";

function QRGenerator({ buku, onClose }) {
  const qrData = JSON.stringify({
    type: "BUKU",
    id: buku.id,
    judul: buku.judul
  });

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "16px" }}>
        <QRCodeSVG 
          value={qrData} 
          size={200}
          level="H"
          includeMargin={true}
          bgColor="#ffffff"
          fgColor="#0f172a"
        />
      </div>
      <div style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", marginBottom: "4px" }}>
        {buku.id}
      </div>
      <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>
        {buku.judul}
      </div>
      <button className="btn-cancel" onClick={onClose}>Tutup</button>
    </div>
  );
}

export default QRGenerator;