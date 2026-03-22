import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Thêm import SweetAlert2
import 'bootstrap/dist/css/bootstrap.min.css';
import './InterviewSlotDetail.css';

const DEFAULT_AVATAR_URL = "https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/avatar-cute-73.jpg";

const InterviewSlotDetail = () => {
  const { id } = useParams(); // id từ URL (thường là SlotId)
  const [slotData, setSlotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho form nhập điểm
  const [techScoreInput, setTechScoreInput] = useState('');
  const [softScoreInput, setSoftScoreInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchInterviewDetail = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7272/api';
        
        // Gọi API lấy chi tiết theo id từ params
        const response = await fetch(`${baseUrl}/interview/detail/${id}`);
        
        if (!response.ok) {
          throw new Error('Không thể tải thông tin phỏng vấn');
        }

        const data = await response.json();
        setSlotData(data);
        
        // Khởi tạo giá trị cho ô nhập (ưu tiên lấy từ data trả về)
        setTechScoreInput(data.technicalScore ?? '');
        setSoftScoreInput(data.softSkillScore ?? '');

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInterviewDetail();
  }, [id]);

  // Hàm xử lý khi bấm nút "Lưu điểm số"
  const handleUpdateScores = async () => {
    if (techScoreInput === '' || softScoreInput === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập đầy đủ điểm số.',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    try {
      setIsUpdating(true);
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7272/api';
      
      // SỬ DỤNG slotData.interviewId CHO PAYLOAD
      const payload = {
        IdInterview: slotData.interviewId, 
        Technical: parseFloat(techScoreInput),
        SoftSkill: parseFloat(softScoreInput)
      };

      const response = await fetch(`${baseUrl}/interview/result`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Lỗi kết nối đến máy chủ');

      const isSuccess = await response.json(); // Nhận về true hoặc false

      // Nới lỏng điều kiện kiểm tra một chút phòng trường hợp API trả về string "true"
      if (isSuccess === true || isSuccess === 'true' || isSuccess.success === true) {
        // Cập nhật state nội bộ để UI hiển thị điểm mới ngay lập tức
        setSlotData(prev => ({
          ...prev,
          technicalScore: payload.Technical,
          softSkillScore: payload.SoftSkill
        }));
        Swal.fire({
          icon: 'success',
          title: 'Thành công!',
          text: 'Cập nhật điểm số thành công!',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Thất bại',
          text: 'Cập nhật thất bại. Vui lòng thử lại.',
          confirmButtonColor: '#0d6efd'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Đã xảy ra lỗi',
        text: err.message,
        confirmButtonColor: '#0d6efd'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric', month: '2-digit', day: '2-digit', 
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-primary';
      case 'Completed': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
  if (error) return <div className="alert alert-danger m-4">Lỗi: {error}</div>;
  if (!slotData) return <div className="text-center mt-5">Dữ liệu không tồn tại</div>;

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Chi tiết ca phỏng vấn</h2>
        <span className={`badge ${getStatusBadge(slotData.status)} fs-6`}>
          {slotData.status}
        </span>
      </div>

      <div className="row">
        {/* Cột trái: Thông tin ứng viên & Công việc */}
        <div className="col-md-7">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Thông tin ứng viên</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-placeholder me-3">
                  <img 
                    src={slotData.candidateAvatarUrl || DEFAULT_AVATAR_URL} 
                    alt="Candidate Avatar" 
                  />
                </div>
                <div>
                  <h5 className="mb-1">{slotData.candidateName || 'Chưa rõ tên'}</h5>
                  <p className="mb-0 text-muted">{slotData.candidateEmail}</p>
                </div>
              </div>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0 d-flex justify-content-between">
                  <span className="text-muted">Số điện thoại:</span>
                  <strong>{slotData.candidatePhone || 'N/A'}</strong>
                </li>
                <li className="list-group-item px-0 d-flex justify-content-between">
                  <span className="text-muted">Kinh nghiệm:</span>
                  <strong>{slotData.experienceYears} năm</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Thông tin tuyển dụng</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0 d-flex justify-content-between">
                  <span className="text-muted">Vị trí:</span>
                  <strong className="text-primary">{slotData.jobTitle}</strong>
                </li>
                <li className="list-group-item px-0 d-flex justify-content-between">
                  <span className="text-muted">Địa điểm:</span>
                  <strong>{slotData.jobLocation}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cột phải: Lịch trình & Cập nhật điểm */}
        <div className="col-md-5">
          <div className="card shadow-sm mb-4 border-primary">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Lịch trình</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="text-muted small">Thời gian bắt đầu</label>
                <div className="fw-bold">{formatDateTime(slotData.startTime)}</div>
              </div>
              <div className="mb-3">
                <label className="text-muted small">Thời gian kết thúc</label>
                <div className="fw-bold">{formatDateTime(slotData.endTime)}</div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Đánh giá & Kết quả</h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-6 text-center">
                  <div className="score-box p-3 bg-light rounded">
                    <h3 className="text-info mb-0">
                      {slotData.technicalScore != null ? Number(slotData.technicalScore).toFixed(1) : '0.0'}
                    </h3>
                    <small className="text-muted">Kỹ thuật</small>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <div className="score-box p-3 bg-light rounded">
                    <h3 className="text-info mb-0">
                      {slotData.softSkillScore != null ? Number(slotData.softSkillScore).toFixed(1) : '0.0'}
                    </h3>
                    <small className="text-muted">Kỹ năng</small>
                  </div>
                </div>
              </div>
              
              <hr />
              <h6 className="mb-3 text-muted">Cập nhật điểm số</h6>
              <div className="mb-3">
                <label className="form-label small">Điểm Kỹ thuật (0-10)</label>
                <input 
                  type="number" className="form-control" 
                  min="0" max="10" step="0.5"
                  value={techScoreInput}
                  onChange={(e) => setTechScoreInput(e.target.value)}
                  disabled={slotData.status !== 'Scheduled'}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Điểm Kỹ năng (0-10)</label>
                <input 
                  type="number" className="form-control" 
                  min="0" max="10" step="0.5"
                  value={softScoreInput}
                  onChange={(e) => setSoftScoreInput(e.target.value)}
                  disabled={slotData.status !== 'Scheduled'}
                />
              </div>

              <div className="d-grid gap-2 mt-4">
                <button 
                  className="btn btn-primary" 
                  onClick={handleUpdateScores}
                  disabled={slotData.status !== 'Scheduled' || isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Đang xử lý...
                    </>
                  ) : 'Lưu điểm số'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSlotDetail;