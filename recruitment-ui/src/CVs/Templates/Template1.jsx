import React from 'react';
import './Template1.css';

const Template1 = ({ cvData, handleTextChange }) => {
  return (
    <div className="a4-paper template-1">
      <div className="t1-left-pane">
        <div className="t1-left-header">
          <h1 className="t1-name" contentEditable suppressContentEditableWarning placeholder="Nhập Họ và Tên..." onBlur={(e) => handleTextChange('fullName', e.target.innerText)}>
            {cvData.fullName}
          </h1>
          <h3 className="t1-position" contentEditable suppressContentEditableWarning placeholder="VD: Giám đốc Nhân sự" onBlur={(e) => handleTextChange('position', e.target.innerText)}>
            {cvData.position}
          </h3>
        </div>

        <div className="t1-left-body">
          <div className="t1-contact-list">
            <div className="t1-contact-item"><strong>📅 Ngày sinh: </strong> <span contentEditable suppressContentEditableWarning placeholder="26/05/1996" onBlur={(e) => handleTextChange('birthday', e.target.innerText)}>{cvData.birthday}</span></div>
            <div className="t1-contact-item"><strong>📞 SĐT: </strong> <span contentEditable suppressContentEditableWarning placeholder="0987 654 321" onBlur={(e) => handleTextChange('phoneNumber', e.target.innerText)}>{cvData.phoneNumber}</span></div>
            <div className="t1-contact-item"><strong>✉️ Email: </strong> <span contentEditable suppressContentEditableWarning placeholder="email@gmail.com" onBlur={(e) => handleTextChange('email', e.target.innerText)}>{cvData.email}</span></div>
            <div className="t1-contact-item"><strong>📍 Địa chỉ: </strong> <span contentEditable suppressContentEditableWarning placeholder="Cầu Giấy, Hà Nội" onBlur={(e) => handleTextChange('address', e.target.innerText)}>{cvData.address}</span></div>
            <div className="t1-contact-item"><strong>👤 Giới tính: </strong> <span contentEditable suppressContentEditableWarning placeholder="Nam / Nữ" onBlur={(e) => handleTextChange('gender', e.target.innerText)}>{cvData.gender}</span></div>
            <div className="t1-contact-item"><strong>🏳️ Quốc tịch: </strong> <span contentEditable suppressContentEditableWarning placeholder="Việt Nam" onBlur={(e) => handleTextChange('nationality', e.target.innerText)}>{cvData.nationality}</span></div>
          </div>

          <div className="t1-left-section">
            <h2 className="t1-left-title">THÔNG TIN BỔ SUNG</h2>
            <div className="t1-left-item">
              <strong>Kinh nghiệm: </strong>
              <span contentEditable suppressContentEditableWarning placeholder="VD: 3 năm" onBlur={(e) => handleTextChange('experienceYears', e.target.innerText)}>{cvData.experienceYears}</span>
            </div>
            <div className="t1-left-item">
              <strong>Mức lương: </strong>
              <span contentEditable suppressContentEditableWarning placeholder="VD: 15.000.000 VNĐ" onBlur={(e) => handleTextChange('currentSalary', e.target.innerText)}>{cvData.currentSalary}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="t1-right-pane">
        <div className="t1-right-header">
          <img src={cvData.fileUrl || "https://placehold.co/300x300/cccccc/ffffff?text=Avatar"} alt="Avatar" className="t1-avatar" />
        </div>

        <div className="t1-right-body">
          <div className="t1-right-section">
            <div className="t1-right-title-wrap">
              <h2 className="t1-right-title">LĨNH VỰC / MỤC TIÊU</h2>
              <div className="t1-right-line"></div>
            </div>
            <p className="t1-right-text" contentEditable suppressContentEditableWarning placeholder="Nhập tóm tắt lĩnh vực chuyên môn và mục tiêu nghề nghiệp của bạn tại đây..." onBlur={(e) => handleTextChange('field', e.target.innerText)}>
              {cvData.field}
            </p>
          </div>

          <div className="t1-right-section">
            <div className="t1-right-title-wrap">
              <h2 className="t1-right-title">TÓM TẮT HỌC VẤN & KINH NGHIỆM</h2>
              <div className="t1-right-line"></div>
            </div>
            <p className="t1-right-text" contentEditable suppressContentEditableWarning placeholder="- Học vấn: Đại học abc...&#10;- Kinh nghiệm: Công ty xyz..." onBlur={(e) => handleTextChange('educationSummary', e.target.innerText)} style={{whiteSpace: 'pre-wrap'}}>
              {cvData.educationSummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;