import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CVs.css';
import { AuthContext } from '../Auth/AuthContext'; 

const CVManagement = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cvs, setCvs] = useState([
    {
      id: 'mock-1',
      title: 'AnhKD_Curriculum Vitae_BE Intern',
      imgUrl: 'https://placehold.co/300x420/f9f9f9/a3a3a3?text=CV+1+BE+Intern',
    },
    {
      id: 'mock-2',
      title: 'CV xin việc',
      imgUrl: 'https://placehold.co/300x420/ffcccc/000000?text=CV+2+Xin+Viec',
    }
  ]);

  // Đổi logic hàm handleCreateCV: Chỉ chuyển hướng sang trang chọn mẫu
  const handleCreateCV = () => {
    navigate('/cv-templates'); 
  };

  return (
    <div className="topcv-container">
      {/* Banner */}
      <div className="banner">
        <span>Hãy chia sẻ nhu cầu công việc để nhận gợi ý việc làm tốt nhất</span>
        <button className="btn-update-job">Cập nhật nhu cầu công việc →</button>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Column - CV List */}
        <section className="cv-section">
          <div className="section-header">
            <h2>CV đã tạo trên hệ thống</h2>
            <button 
              className="btn-create-cv" 
              onClick={handleCreateCV}
            >
              + Tạo CV
            </button>
          </div>

          <div className="cv-grid">
            {cvs.map((cv) => (
              <div className="cv-card" key={cv.id}>
                <div className="cv-image">
                  <img 
                    src={cv.imgUrl} 
                    alt={cv.title} 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://placehold.co/300x420/eeeeee/999999?text=No+Image';
                    }}
                  />
                </div>
                <div className="cv-info">
                  <p>{cv.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column - Sidebar */}
        <aside className="sidebar">
          <div className="profile-card box-shadow">
            <div className="profile-info">
              <div className="avatar-lg"></div>
              <div>
                <p className="welcome-text">Chào bạn trở lại,</p>
                <h3>{user ? user.fullName : 'Ứng viên'}</h3>
                <span className="badge-verified">Tài khoản đã xác thực</span>
              </div>
            </div>
            <a href="#" className="upgrade-link">⇪ Nâng cấp tài khoản</a>
          </div>

          <div className="toggle-card box-shadow">
            <div className="toggle-row">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <span className="toggle-label text-muted">Đang Tắt tìm việc</span>
            </div>
            <p className="description">
              Bật tìm việc không chỉ giúp Nhà tuyển dụng (NTD) nhìn thấy và chủ động mang đến cơ hội cho bạn, còn giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trên danh sách tìm kiếm của NTD.
            </p>
          </div>

          <div className="toggle-card box-shadow">
            <div className="toggle-row">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round green"></span>
              </label>
              <span className="toggle-label text-green">Cho phép NTD tìm kiếm hồ sơ</span>
            </div>
            <p className="description">
              Bạn đang cho phép Nhà tuyển dụng (NTD) tìm kiếm hồ sơ, các NTD uy tín có thể tiếp cận thông tin kinh nghiệm làm việc, học vấn, kỹ năng... trên CV của bạn.
            </p>
            <ul className="benefits-list">
              <li>Nếu cảm thấy phù hợp, NTD sẽ gửi tới bạn một <b>Lời mời kết nối</b>.</li>
              <li>Toàn bộ thông tin định danh cá nhân của bạn như họ tên, ảnh đại diện, số điện thoại, email, địa chỉ sẽ không được chia sẻ với NTD cho đến khi bạn xác nhận đồng ý.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CVManagement;