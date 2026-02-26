import React, { useState, useEffect, useCallback } from 'react';
import './JobList.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);

    const [filters, setFilters] = useState({
        Search: '',
        Location: '',
        experience: '', 
        rank: '',       
        PageNumber: 1,
        PageSize: 6
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch("https://localhost:7272/api/jobs/locations");
                const data = await res.json();
                setLocations(data);
            } catch (err) {
                console.error("Lỗi load locations:", err);
            }
        };
        fetchLocations();
    }, []);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.Search) params.append('Search', filters.Search);
            if (filters.Location) params.append('Location', filters.Location);
            if (filters.experience) params.append('Experience', filters.experience);
            if (filters.rank) params.append('JobType', filters.rank);
            
            params.append('PageNumber', filters.PageNumber);
            params.append('PageSize', filters.PageSize);

            const response = await fetch(`https://localhost:7272/api/jobs/filter?${params.toString()}`);
            const data = await response.json();
            setJobs(data);
        } catch (err) {
            console.error("Lỗi kết nối API:", err);
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
                            {locations.map((loc) => (
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
                            {[
                                {label: 'Tất cả kinh nghiệm', val: ''},
                                {label: 'Chưa có kinh nghiệm', val: '0'},
                                {label: '1 năm', val: '1'},
                                {label: '2 năm', val: '2'},
                                {label: '3+ năm', val: '3'},
                                {label: '5+ năm', val: '5'}
                            ].map(item => (
                                <label key={item.label} className="option-item">
                                    <input 
                                        type="radio" 
                                        name="experience"
                                        value={item.val}
                                        checked={filters.experience === item.val}
                                        onChange={handleInputChange}
                                    /> {item.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Lọc Hình Thức Làm Việc */}
                    <div className="filter-group">
                        <span className="filter-group-label">Hình thức làm việc</span>
                        <div className="options-list">
                            {[
                                { label: 'Tất cả hình thức', val: '' },
                                { label: 'Toàn thời gian', val: '1' },
                                { label: 'Bán thời gian', val: '2' },
                                { label: 'Thực tập', val: '3' }
                            ].map(type => (
                                <label key={type.label} className="option-item">
                                    <input 
                                        type="radio" 
                                        name="rank"
                                        value={type.val}
                                        checked={filters.rank === type.val}
                                        onChange={handleInputChange}
                                    /> {type.label}
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
                        <div className="job-card" key={job.id}>
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
                                    <span className="job-tag">💼 {job.jobType === 1 ? 'Full-time' : 'Part-time'}</span>
                                    {/* Hiển thị kinh nghiệm trên item */}
                                    <span className="job-tag">⏳ {job.experience > 0 ? `${job.experience} năm KN` : 'Không yêu cầu KN'}</span>
                                    <span className="job-tag">⏱ {new Date(job.createdAt).toLocaleDateString()}</span>
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