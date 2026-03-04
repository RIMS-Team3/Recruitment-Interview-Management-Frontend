import React from 'react';
import './Template2.css';

const Template2 = ({ cvData, handleTextChange }) => {
  return (
    <div className="a4-paper template-2">
      <div className="t2-header">
        <div className="t2-avatar-container">
          <img src={cvData.fileUrl || "https://placehold.co/280x380/333/ccc?text=Avatar"} alt="Avatar" className="t2-avatar-img" />
          <div className="t2-tiktok-top">Following | <b>For you</b></div>
          <div className="t2-tiktok-right">
            <div className="t2-icon-group"><span className="t2-icon red-heart">❤️</span><span className="t2-icon-text">1M+</span></div>
            <div className="t2-icon-group"><span className="t2-icon">💬</span></div>
          </div>
          <div className="t2-tiktok-bottom">
            🎵 <span contentEditable suppressContentEditableWarning placeholder="Vị trí ứng tuyển..." onBlur={(e) => handleTextChange('position', e.target.innerText)}>{cvData.position}</span>
          </div>
        </div>

        <div className="t2-info-container">
          <h1 className="t2-fullname" contentEditable suppressContentEditableWarning placeholder="Nhập Họ Tên..." onBlur={(e) => handleTextChange('fullName', e.target.innerText)}>
            {cvData.fullName}
          </h1>
          <div className="t2-contact-list">
            <div className="t2-contact-item"><span className="t2-icon-circle">✉️</span> <strong>Email:</strong> <span contentEditable suppressContentEditableWarning placeholder="Nhập email..." onBlur={(e) => handleTextChange('email', e.target.innerText)}>{cvData.email}</span></div>
            <div className="t2-contact-item"><span className="t2-icon-circle">📞</span> <strong>SĐT:</strong> <span contentEditable suppressContentEditableWarning placeholder="Nhập SĐT..." onBlur={(e) => handleTextChange('phoneNumber', e.target.innerText)}>{cvData.phoneNumber}</span></div>
            <div className="t2-contact-item"><span className="t2-icon-circle">📅</span> <strong>Ngày sinh:</strong> <span contentEditable suppressContentEditableWarning placeholder="DD/MM/YYYY" onBlur={(e) => handleTextChange('birthday', e.target.innerText)}>{cvData.birthday}</span></div>
            <div className="t2-contact-item"><span className="t2-icon-circle">🏠</span> <strong>Địa chỉ:</strong> <span contentEditable suppressContentEditableWarning placeholder="Nơi ở hiện tại..." onBlur={(e) => handleTextChange('address', e.target.innerText)}>{cvData.address}</span></div>
            <div className="t2-contact-item"><span className="t2-icon-circle">👤</span> <strong>Giới tính:</strong> <span contentEditable suppressContentEditableWarning placeholder="Nam/Nữ" onBlur={(e) => handleTextChange('gender', e.target.innerText)}>{cvData.gender}</span></div>
            <div className="t2-contact-item"><span className="t2-icon-circle">🏳️</span> <strong>Quốc tịch:</strong> <span contentEditable suppressContentEditableWarning placeholder="Việt Nam" onBlur={(e) => handleTextChange('nationality', e.target.innerText)}>{cvData.nationality}</span></div>
          </div>
        </div>
      </div>

      <div className="t2-body">
        <div className="t2-col-left">
          <div className="t2-section">
            <h2 className="t2-section-title">THÔNG TIN</h2>
            <div className="t2-item">
              <h4>Số năm kinh nghiệm:</h4>
              <p contentEditable suppressContentEditableWarning placeholder="VD: 2 năm" onBlur={(e) => handleTextChange('experienceYears', e.target.innerText)}>{cvData.experienceYears}</p>
            </div>
            <div className="t2-item">
              <h4>Mức lương hiện tại:</h4>
              <p contentEditable suppressContentEditableWarning placeholder="VD: Thỏa thuận" onBlur={(e) => handleTextChange('currentSalary', e.target.innerText)}>{cvData.currentSalary}</p>
            </div>
          </div>
        </div>

        <div className="t2-col-right">
          <div className="t2-section">
            <h2 className="t2-section-title">LĨNH VỰC / MỤC TIÊU</h2>
            <p className="t2-bullet-list" contentEditable suppressContentEditableWarning placeholder="Nhập lĩnh vực chuyên môn và mục tiêu nghề nghiệp..." onBlur={(e) => handleTextChange('field', e.target.innerText)} style={{whiteSpace: 'pre-wrap', color: '#ccc'}}>
              {cvData.field}
            </p>
          </div>
          <div className="t2-section">
            <h2 className="t2-section-title">TÓM TẮT HỌC VẤN</h2>
            <p className="t2-bullet-list" contentEditable suppressContentEditableWarning placeholder="Liệt kê bằng cấp và kinh nghiệm nổi bật..." onBlur={(e) => handleTextChange('educationSummary', e.target.innerText)} style={{whiteSpace: 'pre-wrap', color: '#ccc'}}>
              {cvData.educationSummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;