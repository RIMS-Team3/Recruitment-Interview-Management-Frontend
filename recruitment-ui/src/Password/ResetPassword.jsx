import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lấy URL từ file .env
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Tạo dữ liệu ngôi sao lấp lánh (Render 1 lần duy nhất)
  const starData = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  // Tạo dữ liệu mưa sao băng ngẫu nhiên
  const meteorData = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 100}%`,
      speed: `${Math.random() * 2 + 3}s`,
      delay: `${Math.random() * 15}s`,
    }));
  }, []);

  // Hàm xử lý gửi yêu cầu khôi phục mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();

      // Kiểm tra kết quả trả về true/false
      if (result === true || result?.success === true) {
        setSubmitted(true);
      } else {
        setError('Email không tồn tại hoặc không thể xử lý yêu cầu.');
      }
    } catch (err) {
      console.error("API Error:", err);
      setError('Đã có lỗi xảy ra hoặc không thể kết nối tới máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      {/* Hiệu ứng nền trời sao */}
      <div className="star-layer">
        {starData.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Hiệu ứng mưa sao băng */}
      {meteorData.map((m) => (
        <div
          key={m.id}
          className="meteor"
          style={{
            top: m.top,
            left: m.left,
            '--speed': m.speed,
            '--delay': m.delay,
          }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="reset-card"
      >
        <div className="reset-header">
          <div className="logo">
            <span className="logo-text">IT <span className="highlight">LOCAK</span></span>
          </div>
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="header-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2>Khôi phục mật khẩu</h2>
                <p>Hệ thống sẽ gửi mã xác nhận đến email của bạn.</p>
              </motion.div>
            ) : (
              <motion.div key="header-s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2>Kiểm tra Email</h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form-active" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Địa chỉ Email</label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? <div className="spinner"></div> : 'Gửi yêu cầu'}
              </button>
            </motion.form>
          ) : (
            <motion.div key="form-success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="success-content">
              <div className="check-icon">✓</div>
              <p>Yêu cầu đã được gửi tới <b>{email}</b> thành công!</p>
              <button onClick={() => {setSubmitted(false); setEmail('');}} className="btn-back">
                Quay lại
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="reset-footer">
          <a href="/login">← Quay lại đăng nhập</a>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;