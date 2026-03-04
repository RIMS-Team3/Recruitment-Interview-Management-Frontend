import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';
import Template3 from './Templates/Template3';
import './CreateCV.css';

const CreateCV = () => {
  const { cvId } = useParams();
  const location = useLocation();

  const initialTemplate = location.state?.selectedTemplate || 'tpl-1';
  const [activeTemplateId, setActiveTemplateId] = useState(initialTemplate); 
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. STATE CHUẨN 100% THEO PAYLOAD BACKEND
  const [cvData, setCvData] = useState({
    id: cvId,
    candidateId: "b1111111-1111-1111-1111-111111111111", // ID mặc định hoặc lấy từ context
    fullName: "",
    position: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthday: "",
    gender: "",
    nationality: "",
    educationSummary: "",
    field: "",
    currentSalary: "",
    experienceYears: "",
    fileUrl: "",
    fileName: "",
    mimeType: "image/png",
    isDefault: true
  });

  // 2. TẢI DỮ LIỆU TỪ DB LÊN KHI MỞ TRANG (GET)
  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch(`https://localhost:7272/api/cvs/${cvId}`);
        if (response.ok) {
          const data = await response.json();
          setCvData(prev => ({
            ...prev,
            ...data // Đổ toàn bộ data từ Backend vào State
          }));
        }
      } catch (error) {
        console.warn("Dùng mock data do lỗi API hoặc đang dùng ID ảo:", error);
        // Fallback data mẫu để test UI
        setCvData(prev => ({ 
          ...prev, 
          fullName: "Tên Ứng Viên", 
          position: "Vị Trí Ứng Tuyển",
          fileUrl: "https://placehold.co/300x400?text=Avatar"
        }));
      } finally {
        setIsLoading(false);
      }
    };

    if (!cvId.startsWith('mock-cv')) fetchCVData();
    else setIsLoading(false);
  }, [cvId]);

  // HÀM CẬP NHẬT TEXT KHI GÕ VÀO TEMPLATE
  const handleTextChange = (field, value) => {
    setCvData(prevData => ({ ...prevData, [field]: value }));
  };

  // 3. LƯU DỮ LIỆU XUỐNG DB (PUT)
  // LƯU DỮ LIỆU XUỐNG DB (PUT)
  const handleSaveCV = async () => {
    if (cvId.startsWith('mock-cv')) {
        alert("⚠️ Bạn đang ở chế độ xem trước (Mock ID). Hãy quay lại trang chọn mẫu và đảm bảo API POST tạo CV thành công trước khi lưu nhé!");
        return;
    }

    setIsSaving(true);
    try {
      // Đóng gói bằng FormData vì Backend nhận IFormFile
      const formData = new FormData();
      formData.append('fullName', cvData.fullName || '');
      formData.append('position', cvData.position || '');
      formData.append('email', cvData.email || '');
      formData.append('phoneNumber', cvData.phoneNumber || '');
      formData.append('address', cvData.address || '');
      formData.append('birthday', cvData.birthday || ''); // Đảm bảo format YYYY-MM-DD nếu BE yêu cầu
      formData.append('gender', cvData.gender || '');
      formData.append('nationality', cvData.nationality || '');
      formData.append('educationSummary', cvData.educationSummary || '');
      formData.append('field', cvData.field || '');
      formData.append('currentSalary', cvData.currentSalary || '');
      formData.append('experienceYears', cvData.experienceYears || '');
      
      console.log("Chuẩn bị gửi dữ liệu lên Backend qua FormData...");

      const response = await fetch(`https://localhost:7272/api/cvs/${cvId}`, {
        method: 'PUT',
        // Tương tự, KHÔNG ĐƯỢC có headers 'Content-Type': 'application/json'
        body: formData
      });

      if (response.ok) {
        alert("🎉 Đã lưu CV thành công vào Database!");
      } else {
        const err = await response.text();
        console.error("Lỗi từ backend:", err);
        throw new Error(`API báo lỗi: ${response.status}`);
      }
    } catch (error) {
      console.error("Lỗi khi lưu CV:", error);
      alert("❌ Lưu thất bại! Hãy check F12 Console để xem chi tiết.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderTemplate = () => {
    if (isLoading) return <div style={{padding: '50px', textAlign:'center'}}>Đang tải dữ liệu CV...</div>;

    switch (activeTemplateId) {
      case 'tpl-1': return <Template1 cvData={cvData} handleTextChange={handleTextChange} />;
      case 'tpl-2': return <Template2 cvData={cvData} handleTextChange={handleTextChange} />;
      case 'tpl-3': return <Template3 cvData={cvData} handleTextChange={handleTextChange} />;
      default: return <Template1 cvData={cvData} handleTextChange={handleTextChange} />;
    }
  };

  return (
    <div className="create-cv-layout">
      <aside className="cv-sidebar">
        <button className={`menu-btn ${activeTemplateId === 'tpl-1' ? 'active' : ''}`} onClick={() => setActiveTemplateId('tpl-1')}>Dùng Mẫu 1</button>
        <button className={`menu-btn ${activeTemplateId === 'tpl-2' ? 'active' : ''}`} onClick={() => setActiveTemplateId('tpl-2')}>Dùng Mẫu 2</button>
        <button className={`menu-btn ${activeTemplateId === 'tpl-3' ? 'active' : ''}`} onClick={() => setActiveTemplateId('tpl-3')}>Dùng Mẫu 3</button>
      </aside>

      <main className="cv-workspace">
        <div className="workspace-header">
          <input type="text" className="cv-name-input" defaultValue="CV chưa đặt tên" />
          <button 
            className="btn-save" 
            onClick={handleSaveCV}
            disabled={isSaving || isLoading}
            style={{ opacity: (isSaving || isLoading) ? 0.7 : 1, cursor: (isSaving || isLoading) ? 'not-allowed' : 'pointer' }}
          >
            {isSaving ? '⏳ Đang lưu...' : '💾 Lưu CV'}
          </button>
        </div>
        {renderTemplate()}
      </main>
    </div>
  );
};

export default CreateCV;