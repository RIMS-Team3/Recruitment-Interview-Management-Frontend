import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './JobDetails.css';

const JobPostDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // State để quản lý việc hiển thị thông báo ứng tuyển thành công
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // Gọi API lấy chi tiết công việc
        fetch(`https://localhost:7272/api/jobs/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Không thể tải dữ liệu");
                return res.json();
            })
            .then(data => {
                setJob(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi:", err);
                setLoading(false);
            });
    }, [id]);

    // Hàm xử lý khi nhấn nút Ứng tuyển
    const handleApply = () => {
        // Giả lập logic gửi dữ liệu...
        // Hiển thị thông báo
        setShowToast(true);

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Đang cập nhật";
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const renderExperience = (exp) => {
        if (exp === undefined || exp === null) return "Chưa cập nhật";
        if (exp === 0) return "Không yêu cầu kinh nghiệm";
        return `${exp} năm kinh nghiệm`;
    };

    if (loading) return <div className="status-msg">Đang tải dữ liệu công việc...</div>;
    if (!job) return <div className="status-msg">Không tìm thấy thông tin công việc.</div>;

    return (
        <div className="job-page-wrapper">
            {/* THÔNG BÁO (TOAST) TỰ CHẾ */}
            {showToast && (
                <div className="custom-toast">
                    <span className="toast-icon">✅</span>
                    <div className="toast-content">
                        <strong>Thành công!</strong>
                        <p>Bạn đã ứng tuyển vị trí {job.title}</p>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <nav className="job-breadcrumb">
                <Link to="/">Việc làm</Link> <span>/</span> 
                <Link to="/jobs">IT Phần mềm</Link> <span>/</span> 
                {job.title}
            </nav>

            <div className="job-container-layout">
                {/* Cột Trái - Nội dung chính */}
                <div className="job-main-column">
                    <div className="job-header-card">
                        <h1 className="job-main-title">{job.title}</h1>
                        
                        <div className="job-stats-container">
                            <div className="stat-box">
                                <div className="stat-icon">💵</div>
                                <div className="stat-info">
                                    <span className="stat-label">Mức lương</span>
                                    <span className="stat-value">
                                        {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} USD
                                    </span>
                                </div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-icon">📍</div>
                                <div className="stat-info">
                                    <span className="stat-label">Địa điểm</span>
                                    <span className="stat-value">{job.location}</span>
                                </div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-icon">⏳</div>
                                <div className="stat-info">
                                    <span className="stat-label">Kinh nghiệm</span>
                                    <span className="stat-value">{renderExperience(job.experience)}</span>
                                </div>
                            </div>
                        </div>

                        <p className="job-deadline">Hạn nộp hồ sơ: {formatDate(job.expireAt)}</p>

                        <div className="job-actions">
                            <button className="btn-apply-now" onClick={handleApply}>
                                Ứng tuyển ngay
                            </button>
                            <button className="btn-save-job">♡ Lưu tin</button>
                        </div>
                    </div>

                    <div className="job-content-card">
                        <h2 className="content-heading">Chi tiết tin tuyển dụng</h2>
                        
                        <div className="requirement-row">
                            <span className="req-label">Yêu cầu:</span>
                            <span className="req-tag">{renderExperience(job.experience)}</span>
                            <span className="req-tag">Đại học trở lên</span>
                        </div>

                        <div className="description-section">
                            <h3>Mô tả công việc</h3>
                            <div className="desc-text">
                                {job.description || "Chưa có mô tả chi tiết."}
                            </div>
                        </div>

                        <div className="description-section">
                            <h3>Yêu cầu ứng viên</h3>
                            <div className="desc-text">
                                {job.requirement || "Chưa có yêu cầu cụ thể."}
                            </div>
                        </div>

                        <div className="description-section">
                            <h3>Quyền lợi</h3>
                            <div className="desc-text">
                                {job.benefit || "Quyền lợi theo chính sách công ty."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cột Phải - Sidebar */}
                <div className="job-sidebar-column">
                    <div className="company-card-right">
                        <div className="company-header-flex">
                            <div className="company-logo-img">
                                {job.company?.logoUrl ? 
                                    <img src={job.company.logoUrl} alt="logo" style={{width: '100%', borderRadius: '4px'}} /> 
                                    : "LOGO"}
                            </div>
                            <div className="company-name-box">
                                <h4>{job.company?.name || "Tên công ty"}</h4>
                                <span className="pro-label">Pro Company</span>
                            </div>
                        </div>
                        <div className="company-meta-list">
                            <p>👥 Quy mô: <strong>100-500 nhân viên</strong></p>
                            <p>🏗 Lĩnh vực: <strong>{job.company?.description || "Công nghệ"}</strong></p>
                            <p>📍 Địa điểm: <strong>{job.company?.address || "Việt Nam"}</strong></p>
                        </div>
                        <a href={`https://${job.company?.website}`} target="_blank" rel="noreferrer" className="view-company-link">
                            Xem trang công ty ↗
                        </a>
                    </div>

                    <div className="general-info-card-right">
                        <h4>Thông tin chung</h4>
                        <div className="gen-item">
                            <span className="gen-label">Hình thức làm việc</span>
                            <span className="gen-val">{job.jobType === 1 ? "Toàn thời gian" : "Bán thời gian"}</span>
                        </div>
                        <div className="gen-item">
                            <span className="gen-label">Kinh nghiệm</span>
                            <span className="gen-val">{renderExperience(job.experience)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPostDetails;