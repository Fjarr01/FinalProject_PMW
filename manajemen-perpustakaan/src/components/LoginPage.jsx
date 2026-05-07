import React, { useState } from "react";
import { FiLock, FiUser, FiLogIn } from "react-icons/fi";
import { dummyUsers } from "../data/dummyBooks";
import "../styles/login.css";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const user = dummyUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        const session = {
          id: user.id,
          nama: user.nama,
          role: user.role,
          username: user.username,
          avatar: user.avatar
        };
        localStorage.setItem("perpus_user", JSON.stringify(session));
        onLogin(session);
      } else {
        setError("Username atau password salah");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Pustaka Digital</h1>
        <p className="login-subtitle">Sistem Manajemen Perpustakaan</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-group">
            <label className="login-label">Username</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">
                <FiUser />
              </span>
              <input
                type="text"
                className="login-input"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-group">
            <label className="login-label">Password</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">
                <FiLock />
              </span>
              <input
                type="password"
                className="login-input"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Memuat..." : "Masuk"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default LoginPage;