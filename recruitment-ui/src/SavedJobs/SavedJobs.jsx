import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedJobs, unsaveJob } from '../services/savedJobsApi';
import './SavedJobs.css';

const SavedJobs = () => {
  const navigate = useNavigate();
  const candidateId = useMemo(() => localStorage.getItem('candidateId') || '', []);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!candidateId) {
        setLoading(false);
        return;
      }

      try {
        const result = await getSavedJobs(candidateId);
        setJobs(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [candidateId]);

  const handleRemove = async (jobId) => {
    try {
      await unsaveJob(candidateId, jobId);
      setJobs((prev) => prev.filter((job) => job.jobId !== jobId));
    } catch (error) {
      console.error(error);
      alert('Không thể bỏ lưu công việc.');
    }
  };

  return (
    <div className="saved-jobs-wrapper">
      <div className="saved-jobs-header">
        <h2>Việc làm đã lưu</h2>
        <button className="back-btn" onClick={() => navigate('/jobs')}>← Quay lại JobList</button>
      </div>

      {loading && <p>Đang tải...</p>}

      {!loading && jobs.length === 0 && (
        <div className="empty-state">Bạn chưa lưu công việc nào.</div>
      )}

      {!loading && jobs.map((job) => (
        <div className="saved-job-item" key={job.jobId}>
          <div>
            <h3>{job.title}</h3>
            <p>{job.location}</p>
            <p>{job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} $</p>
          </div>
          <button className="remove-btn" onClick={() => handleRemove(job.jobId)}>Bỏ lưu</button>
        </div>
      ))}
    </div>
  );
};

export default SavedJobs;