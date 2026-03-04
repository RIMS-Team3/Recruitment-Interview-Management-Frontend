import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import './CVTemplates.css';

const CVTemplates = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isCallingApi, setIsCallingApi] = useState(false);

  // 1. Chuyển templates thành state và để sẵn ảnh placeholder dự phòng
  const [templates, setTemplates] = useState([
    { id: 'tpl-1', name: 'Mẫu Sang trọng (Xanh rêu)', imgUrl: 'https://placehold.co/300x420/8c9e82/ffffff?text=Loading...' },
    { id: 'tpl-2', name: 'Mẫu TikTok (Dark Mode)', imgUrl: 'https://placehold.co/300x420/111111/ffffff?text=Loading...' },
    { id: 'tpl-3', name: 'Mẫu Hiện đại (Vàng xám)', imgUrl: 'https://placehold.co/300x420/FDF7E7/333333?text=Loading...' }
  ]);

  // 2. Dùng useEffect để gọi API lấy ảnh khi trang vừa load
  useEffect(() => {
    const fetchTemplateImages = async () => {
      try {
        const response = await fetch('https://localhost:7272/api/cvs/images');
        if (response.ok) {
          const imageUrls = await response.json(); // Mảng các chuỗi URL
          
          setTemplates(prevTemplates => prevTemplates.map((tpl, index) => {
            // Tìm URL chứa tên file tương ứng (VD: template1.png, template2.png)
            // Nếu không tìm thấy thì fallback lấy theo thứ tự index, nếu vẫn không có thì giữ ảnh cũ
            const matchedUrl = imageUrls.find(url => url.includes(`template${index + 1}.png`)) 
                               || imageUrls[index] 
                               || tpl.imgUrl;
            
            return { ...tpl, imgUrl: matchedUrl };
          }));
        }
      } catch (error) {
        console.error("Lỗi khi load ảnh templates từ API:", error);
      }
    };

    fetchTemplateImages();
  }, []);

 const handleSelectTemplate = async (templateId) => {
    setIsCallingApi(true);

    try {
      // =====================================================================
      // 🚀 KHI NÀO BE LÀM XONG API: XÓA DẤU /* VÀ */ Ở ĐẦU/CUỐI ĐOẠN NÀY ĐỂ DÙNG THẬT
      // =====================================================================
      
      /*
      // 1. Đóng gói dữ liệu bằng FormData (bắt buộc vì Backend có nhận file ảnh IFormFile)
      const formData = new FormData();
      
      // Lấy ID thật của ứng viên từ context (khi đã làm xong chức năng Đăng nhập)
      formData.append('candidateId', user?.id || "b1111111-1111-1111-1111-111111111111");
      
      // Truyền đủ các trường bắt buộc để không bị lỗi 400 Bad Request
      formData.append('fullName', 'CV chưa đặt tên'); 
      formData.append('position', 'Vị trí ứng tuyển');
      formData.append('email', 'email@example.com');
      formData.append('isDefault', 'true');

      // 2. Gọi API POST để tạo bản ghi CV mới trong Database
      const response = await fetch('https://localhost:7272/api/cvs', {
        method: 'POST',
        // Bắt buộc KHÔNG set header Content-Type ở đây, để trình duyệt tự xử lý multipart/form-data
        body: formData
      });

      // 3. Xử lý kết quả trả về
      if (response.ok) {
        const data = await response.json();
        // Chuyển sang trang CreateCV kèm theo ID thật vừa được Backend tạo ra
        navigate(`/create-cv/${data.id}`, { state: { selectedTemplate: templateId } });
        
        // Return luôn để kết thúc hàm, KHÔNG chạy xuống phần Mock bên dưới nữa
        return; 
      } else {
        const errorText = await response.text();
        console.error("Lỗi 400 từ Backend:", errorText);
        throw new Error('Gọi API tạo CV thất bại');
      }
      */

      // =====================================================================
      // 🛠 PHẦN DÙNG TẠM CHO UI: KHI NÀO MỞ COMMENT Ở TRÊN THÌ TẮT HOẶC XÓA PHẦN NÀY ĐI
      // =====================================================================
      
      console.warn("⚠️ Đang chạy chế độ Test UI (Tạo ID giả). Bấm Lưu CV sẽ bị chặn.");
      
      // Tự sinh ra 1 cái ID giả để dùng tạm
      // const randomMockId = `mock-cv-${templateId}-${Math.floor(Math.random() * 10000)}`;

      //id test tạm thời để chuyển sang trang chỉnh sửa CV, sau khi BE làm xong API POST tạo CV thì sẽ chuyển sang dùng ID thật từ BE trả về
      const realDbId = "D1111111-1111-1111-1111-111111111111";

      // Nhảy sang trang chỉnh sửa CV với ID giả
      // navigate(`/create-cv/${randomMockId}`, { state: { selectedTemplate: templateId } });
      navigate(`/create-cv/${realDbId}`, { state: { selectedTemplate: templateId } });

    } catch (error) {
      console.error("Lỗi khi xử lý chọn mẫu:", error);
      alert("Có lỗi xảy ra! Vui lòng kiểm tra Console (F12).");
    } finally {
      setIsCallingApi(false);
    }
  };

  return (
    <div className="template-container">
      <div className="template-header">
        <p className="breadcrumb">Trang chủ {'>'} Mẫu CV tiếng Việt</p>
        <h1>Mẫu CV xin việc tiếng Việt, Anh, Nhật, Trung chuẩn 2026</h1>
        <p className="subtitle">Tuyển chọn các mẫu CV đa dạng phong cách, giúp bạn tạo dấu ấn cá nhân và kết nối mạnh mẽ hơn với nhà tuyển dụng.</p>
      </div>

      {isCallingApi && <div className="loading-overlay">Đang khởi tạo CV...</div>}

      <div className="template-grid">
        {templates.map(tpl => (
          <div className="template-card" key={tpl.id}>
            <div className="template-img-wrapper">
              <img src={tpl.imgUrl} alt={tpl.name} />
              <div className="template-overlay">
                <button 
                  className="btn-use-template"
                  onClick={() => handleSelectTemplate(tpl.id)}
                  disabled={isCallingApi}
                >
                  Dùng mẫu này
                </button>
              </div>
            </div>
            <p className="template-name">{tpl.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVTemplates;