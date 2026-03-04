import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import './ApplyJob.css';

const ApplyJob = ({ jobId }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [ids, setIds] = useState({ candidateId: null, cvId: null });

  useEffect(() => {
    const cid = localStorage.getItem("candidateId");
    const cvid = localStorage.getItem("cvId");
    if (cid && cvid) {
      setIds({ candidateId: cid, cvId: cvid });
    }
  }, []);

  const handleApply = async () => {
    if (!ids.candidateId || !ids.cvId) {
      toast.error("Vui lòng đăng nhập để ứng tuyển!");
      return;
    }

    setIsApplying(true);
    const toastId = toast.loading("Đang xử lý ứng tuyển...");

    try {
      const response = await fetch('https://localhost:7272/api/Application/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: jobId,
          candidateId: ids.candidateId,
          cvId: ids.cvId
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "🎉 Ứng tuyển thành công!", { id: toastId });
      } else {
        toast.error(result.message || "Ứng tuyển thất bại.", { id: toastId });
      }
    } catch (error) {
      toast.error("Lỗi kết nối server!", { id: toastId });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <button 
      className={`btn-apply-now ${isApplying ? 'applying' : ''}`} 
      onClick={handleApply}
      disabled={isApplying}
    >
      {isApplying ? "Đang gửi..." : "Ứng tuyển ngay"}
    </button>
  );
};

export default ApplyJob;