import React from 'react';
import './Template3.css';

const Template3 = ({ cvData, handleTextChange }) => {
  return (
    <div className="a4-paper template-3">
      <div className="t3-header">
        <h1 className="t3-name" contentEditable suppressContentEditableWarning placeholder="NHẬP HỌ TÊN" onBlur={(e) => handleTextChange('fullName', e.target.innerText)}>
          {cvData.fullName}
        </h1>
        <h3 className="t3-position" contentEditable suppressContentEditableWarning placeholder="Nhập vị trí ứng tuyển..." onBlur={(e) => handleTextChange('position', e.target.innerText)}>
          {cvData.position}
        </h3>
      </div>

      <div className="t3-body">
        <div className="t3-left-col">
          <div className="t3-section">
            <h2 className="t3-section-title golden-text">Lĩnh vực & Mục tiêu</h2>
            <p className="t3-text" contentEditable suppressContentEditableWarning placeholder="Bạn có thế mạnh gì? Mục tiêu 3 năm tới của bạn là gì?" onBlur={(e) => handleTextChange('field', e.target.innerText)} style={{whiteSpace: 'pre-wrap'}}>
              {cvData.field}
            </p>
          </div>

          <div className="t3-section">
            <div className="t3-title-with-icon"><span className="t3-icon-bg">💡</span><h2 className="t3-section-title golden-text">Tóm tắt Học vấn & Kinh nghiệm</h2></div>
            <p className="t3-text" contentEditable suppressContentEditableWarning placeholder="- Học Đại học A, chuyên ngành B&#10;- Từng làm ở công ty C..." onBlur={(e) => handleTextChange('educationSummary', e.target.innerText)} style={{whiteSpace: 'pre-wrap'}}>
              {cvData.educationSummary}
            </p>
          </div>
        </div>

        <div className="t3-right-col">
          <div className="t3-avatar-wrapper">
            <img src={cvData.fileUrl || "https://placehold.co/300x300/cccccc/ffffff?text=Avatar"} alt="Avatar" className="t3-avatar" />
          </div>

          <div className="t3-contact-list">
            <div className="t3-contact-item"><span className="t3-icon-golden">📞</span> <strong>SĐT: </strong> <span contentEditable suppressContentEditableWarning placeholder="Nhập số..." onBlur={(e) => handleTextChange('phoneNumber', e.target.innerText)}>{cvData.phoneNumber}</span></div>
            <div className="t3-contact-item"><span className="t3-icon-golden">✉️</span> <strong>Email: </strong> <span contentEditable suppressContentEditableWarning placeholder="Nhập mail..." onBlur={(e) => handleTextChange('email', e.target.innerText)}>{cvData.email}</span></div>
            <div className="t3-contact-item"><span className="t3-icon-golden">📍</span> <strong>Địa chỉ: </strong> <span contentEditable suppressContentEditableWarning placeholder="Nhập nơi ở..." onBlur={(e) => handleTextChange('address', e.target.innerText)}>{cvData.address}</span></div>
            <div className="t3-contact-item"><span className="t3-icon-golden">📅</span> <strong>Ngày sinh: </strong> <span contentEditable suppressContentEditableWarning placeholder="Nhập ngày..." onBlur={(e) => handleTextChange('birthday', e.target.innerText)}>{cvData.birthday}</span></div>
            <div className="t3-contact-item"><span className="t3-icon-golden">👤</span> <strong>Giới tính: </strong> <span contentEditable suppressContentEditableWarning placeholder="Nam/Nữ" onBlur={(e) => handleTextChange('gender', e.target.innerText)}>{cvData.gender}</span></div>
            <div className="t3-contact-item"><span className="t3-icon-golden">🏳️</span> <strong>Quốc tịch: </strong> <span contentEditable suppressContentEditableWarning placeholder="Việt Nam" onBlur={(e) => handleTextChange('nationality', e.target.innerText)}>{cvData.nationality}</span></div>
          </div>

          <div className="t3-right-section">
            <h2 className="t3-right-title">Bổ sung</h2>
            <div className="t3-right-item">
              <strong>Kinh nghiệm:</strong> <span contentEditable suppressContentEditableWarning placeholder="Số năm" onBlur={(e) => handleTextChange('experienceYears', e.target.innerText)}>{cvData.experienceYears}</span>
            </div>
            <div className="t3-right-item">
              <strong>Mức lương:</strong> <span contentEditable suppressContentEditableWarning placeholder="Mức lương" onBlur={(e) => handleTextChange('currentSalary', e.target.innerText)}>{cvData.currentSalary}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;