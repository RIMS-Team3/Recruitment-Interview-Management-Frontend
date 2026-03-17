import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

import Template1 from "./Templates/Template1";
import Template2 from "./Templates/Template2";
import Template3 from "./Templates/Template3";

import "./CreateCV.css";

const CVViewer = () => {
  const { cvId } = useParams();

  const [cvData, setCvData] = useState(null);
  const [templateId, setTemplateId] = useState("tpl-1");
  const [loading, setLoading] = useState(true);

  const cvRef = useRef(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        const response = await fetch(
          `${baseUrl}/cvs/${cvId}`
        );

        if (!response.ok) {
          throw new Error("Không tải được CV");
        }

        const data = await response.json();

        setCvData(data);

        if (data.templateId) {
          setTemplateId(data.templateId);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết CV:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cvId) {
      fetchCV();
    }
  }, [cvId]);

  const handleExportPDF = () => {
    const element = cvRef.current;
    if (!element) return;

    const fileName = cvData?.fullName
      ? `CV_${cvData.fullName.replace(/\s+/g, "_")}.pdf`
      : "CV.pdf";

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderTemplate = () => {
    if (loading) {
      return <div className="loading-spinner">Đang tải CV...</div>;
    }

    if (!cvData) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <p>Không tìm thấy nội dung CV (ID: {cvId})</p>
        </div>
      );
    }

    // CHỈNH SỬA: Khóa hàm thay đổi để chặn React cập nhật dữ liệu
    const templateProps = { 
      cvData, 
      readOnly: true,
      handleTextChange: () => {}, 
      handleArrayChange: () => {} 
    };

    switch (templateId) {
      case "tpl-2":
        return <Template2 {...templateProps} />;
      case "tpl-3":
        return <Template3 {...templateProps} />;
      default:
        return <Template1 {...templateProps} />;
    }
  };

  return (
    <div className="create-cv-layout">
      <header className="workspace-header">
        <div className="header-container">
          <h2>CV ứng viên</h2>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ color: "#ef4444", fontWeight: "600" }}>
              🔒 Chế độ xem
            </span>
            <button
              onClick={handleExportPDF}
              className="btn-download-pdf"
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 18px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              📄 Download PDF
            </button>
          </div>
        </div>
      </header>

      <main className="cv-workspace">
        {/* CHỈNH SỬA: Chặn sự kiện phím và áp dụng class khóa triệt để */}
        <div 
          ref={cvRef} 
          className="cv-viewer-mode"
          onKeyDown={(e) => e.preventDefault()}
          tabIndex="-1" 
        >
          {renderTemplate()}
        </div>
      </main>
    </div>
  );
};

export default CVViewer;