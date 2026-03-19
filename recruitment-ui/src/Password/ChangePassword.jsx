import React, { useState, useEffect } from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  // Lấy email từ localStorage ngay khi khởi tạo state
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || '', 
    OldPassword: '',
    NewPassword: ''
  });

  const [responseState, setResponseState] = useState({
    loading: false,
    success: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseState({ loading: true, success: null, message: '' });

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      
      const response = await fetch(`${baseUrl}/auth/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Thêm token nếu API của bạn yêu cầu xác thực
          // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setResponseState({
          loading: false,
          success: true,
          message: data.message || 'Đổi mật khẩu thành công!'
        });
        // Reset 2 field password, giữ nguyên email
        setFormData(prev => ({ ...prev, OldPassword: '', NewPassword: '' }));
      } else {
        setResponseState({
          loading: false,
          success: false,
          message: data.message || 'Có lỗi xảy ra, vui lòng thử lại.'
        });
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setResponseState({
        loading: false,
        success: false,
        message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.'
      });
    }
  };

  return (
    <div className="space-background">
      {/* Các layer hiệu ứng vũ trụ */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="meteors">
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
        <div className="meteor"></div>
      </div>

      {/* Form đổi mật khẩu */}
      <div className="form-container">
        <h2>Đổi Mật Khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly 
              className="readonly-input"
              title="Email được lấy tự động từ hệ thống"
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu cũ</label>
            <input
              type="password"
              name="OldPassword"
              value={formData.OldPassword}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="NewPassword"
              value={formData.NewPassword}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          {responseState.message && (
            <div className={`message ${responseState.success ? 'success-msg' : 'error-msg'}`}>
              {responseState.message}
            </div>
          )}

          <button type="submit" disabled={responseState.loading || !formData.email}>
            {responseState.loading ? 'Đang xử lý...' : 'Xác nhận đổi mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;