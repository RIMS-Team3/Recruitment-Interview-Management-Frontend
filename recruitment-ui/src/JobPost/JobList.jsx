import React, { useState, useEffect, useCallback } from 'react';
import './JobList.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // State lưu trữ dữ liệu động cho bộ lọc lấy từ API
    const [dynamicFilters, setDynamicFilters] = useState({
        locations: [],
        experiences: [],
        jobTypes: []
    });

    const [filters, setFilters] = useState({
        Search: '',
        Location: '',
        experience: '', 
        rank: '',       
        PageNumber: 1,
        PageSize: 6
    });

    // Gọi API để lấy dữ liệu động cho các bộ lọc (Location, Experience, JobType)
    useEffect(() => {
        const initData = async () => {
            try {
                const res = await fetch("https://localhost:7272/api/jobs");
                const data = await res.json();
                
                // Trích xuất các địa điểm duy nhất
                const locations = [...new Set(data.map(j => j.location))].filter(Boolean).sort();
                
                // Trích xuất các mức kinh nghiệm duy nhất
                const experiences = [...new Set(data.map(j => j.experience))]
                    .filter(exp => exp !== null && exp !== undefined)
                    .sort((a, b) => a - b);
                
                // Trích xuất các loại công việc (JobType) duy nhất
                const jobTypesMap = new Map();
                data.forEach(j => {
                    if (j.jobType !== null && j.jobTypeName !== null) {
                        jobTypesMap.set(j.jobType, j.jobTypeName);
                    }
                });
                const jobTypes = Array.from(jobTypesMap, ([id, name]) => ({ id, name }));

                setDynamicFilters({ locations, experiences, jobTypes });
            } catch (err) {
                console.error("Lỗi khởi tạo dữ liệu bộ lọc:", err);
            }
        };
        initData();
    }, []);

    // Lọc danh sách công việc theo tham số
    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.Search) params.append('Search', filters.Search);
            if (filters.Location) params.append('Location', filters.Location);
            if (filters.experience !== '') params.append('Experience', filters.experience);
            if (filters.rank !== '') params.append('JobType', filters.rank);
            
            params.append('PageNumber', filters.PageNumber);
            params.append('PageSize', filters.PageSize);

            const response = await fetch(`https://localhost:7272/api/jobs/filter?${params.toString()}`);
            const data = await response.json();
            setJobs(data);
        } catch (err) {
            console.error("Lỗi kết nối API lọc công việc:", err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchJobs();
        }, 300);
        return () => clearTimeout(handler);
    }, [filters, fetchJobs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value, PageNumber: 1 }));
    };

    const handleReset = () => {
        setFilters({
            Search: '',
            Location: '',
            experience: '',
            rank: '',
            PageNumber: 1,
            PageSize: 6
        });
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, PageNumber: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="wrapper">
            <header className="sticky-header">
                <div className="search-container">
                    <div className="search-box">
                        <span className="icon">🔍</span>
                        <input 
                            type="text" 
                            name="Search"
                            value={filters.Search}
                            onChange={handleInputChange}
                            placeholder="Tên công việc, vị trí ứng tuyển..." 
                        />
                    </div>

                    <div className="location-box">
                        <span className="icon">📍</span>
                        <select name="Location" value={filters.Location} onChange={handleInputChange}>
                            <option value="">Tất cả địa điểm</option>
                            {dynamicFilters.locations.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <button className="btn-find" onClick={fetchJobs}>Tìm kiếm</button>
                </div>
            </header>

            <div className="main-content">
                <aside className="sidebar">
                    <div className="filter-header">
                        <span className="filter-icon">⚡</span> Lọc nâng cao
                    </div>

                    {/* Lọc Kinh Nghiệm */}
                    <div className="filter-group">
                        <span className="filter-group-label">Kinh nghiệm</span>
                        <div className="options-list">
                            <label className={`option-item ${filters.experience === '' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="experience" 
                                    value="" 
                                    checked={filters.experience === ''} 
                                    onChange={handleInputChange} 
                                />
                                <span className="custom-radio"></span> Tất cả kinh nghiệm
                            </label>
                            {dynamicFilters.experiences.map(exp => (
                                <label key={`exp-${exp}`} className={`option-item ${filters.experience === exp.toString() ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="experience" 
                                        value={exp} 
                                        checked={filters.experience === exp.toString()} 
                                        onChange={handleInputChange} 
                                    />
                                    <span className="custom-radio"></span>
                                    {exp === 0 ? "Chưa có kinh nghiệm" : `${exp} năm kinh nghiệm`}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Lọc Hình Thức Làm Việc */}
                    <div className="filter-group">
                        <span className="filter-group-label">Hình thức làm việc</span>
                        <div className="options-list">
                            <label className={`option-item ${filters.rank === '' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="rank" 
                                    value="" 
                                    checked={filters.rank === ''} 
                                    onChange={handleInputChange} 
                                />
                                <span className="custom-radio"></span> Tất cả hình thức
                            </label>
                            {dynamicFilters.jobTypes.map(type => (
                                <label key={`type-${type.id}`} className={`option-item ${filters.rank === type.id.toString() ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="rank" 
                                        value={type.id} 
                                        checked={filters.rank === type.id.toString()} 
                                        onChange={handleInputChange} 
                                    />
                                    <span className="custom-radio"></span>
                                    {type.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button className="btn-reset" onClick={handleReset}>🔄 Xóa bộ lọc</button>
                </aside>

                <main className={`job-section ${loading ? 'loading-blur' : ''}`}>
                    <div className="job-count-info">
                        {loading ? "Đang cập nhật..." : <>Có <strong>{jobs.length}</strong> việc làm phù hợp</>}
                    </div>

                    {jobs.map((job) => (
                        <div className="job-card" key={job.idJobPost}>
                            <div className="logo-box">
                                <img src="https://static.topcv.vn/company_logo/default-company-logo.png" alt="logo" />
                            </div>
                            <div className="job-info">
                                <div className="job-top">
                                    <h3 className="job-title">{job.title}</h3>
                                    <span className="job-salary">
                                        {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()} $
                                    </span>
                                </div>
                                <div className="comp-name">HỆ THỐNG QUẢN LÝ TUYỂN DỤNG RIMS</div>
                                <div className="job-tags">
                                    <span className="job-tag">📍 {job.location}</span>
                                    <span className="job-tag">💼 {job.jobTypeName || 'N/A'}</span>
                                    <span className="job-tag">⏳ {job.experience > 0 ? `${job.experience} năm KN` : 'Không yêu cầu KN'}</span>
                                    <span className="job-tag">⏱ {new Date(job.expireAt).toLocaleDateString()}</span>
                                </div>
                                <div className="job-footer">
                                    <span className="job-date">Hạn nộp: {new Date(job.expireAt).toLocaleDateString()}</span>
                                    <div className="job-actions">
                                        <button className="btn-wishlist" title="Lưu tin">❤</button>
                                        <button className="btn-apply">Ứng tuyển ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="pagination-container">
                        <button 
                            className="btn-page" 
                            disabled={filters.PageNumber === 1}
                            onClick={() => handlePageChange(filters.PageNumber - 1)}
                        >
                            « Trang trước
                        </button>
                        <span className="page-info">Trang {filters.PageNumber}</span>
                        <button 
                            className="btn-page" 
                            disabled={jobs.length < filters.PageSize}
                            onClick={() => handlePageChange(filters.PageNumber + 1)}
                        >
                            Trang sau »
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default JobList;