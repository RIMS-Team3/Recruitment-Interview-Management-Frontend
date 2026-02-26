import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, Clock, MapPin, Globe, Plus, CheckCircle2, 
  XCircle, Building2, ChevronRight, Filter, X, ChevronLeft 
} from 'lucide-react';
import './InterviewPage.css';

const InterviewPage = () => {
    const { companyId } = useParams();
    const today = new Date().toISOString().split('T')[0];
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    // States cho Filter và Phân trang
    const [selectedDate, setSelectedDate] = useState(today);
    const [currentPage, setCurrentPage] = useState(1);
    const [newSlot, setNewSlot] = useState({ startTime: '', endTime: '' });

    const fetchData = useCallback(async () => {
        if (!companyId) return;
        try {
            setLoading(true);
            // Gửi params theo class RequestViewInterviewSlots
            const response = await axios.get(`https://localhost:7272/api/interview/slots`, {
                params: { 
                    IdCompany: companyId, 
                    ChooesDate: selectedDate,
                    CurrentPage: currentPage 
                }
            });
            setData(response.data);
        } catch (err) {
            console.error("Lỗi lấy dữ liệu:", err);
        } finally {
            setLoading(false);
        }
    }, [companyId, selectedDate, currentPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Reset về trang 1 khi đổi ngày
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setCurrentPage(1);
    };

    const handleCreateSlot = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...data,
                interviewSlotItems: [
                    ...(data?.interviewSlotItems || []),
                    {
                        startTime: newSlot.startTime,
                        endTime: newSlot.endTime,
                        isBooked: false,
                        idCompany: companyId
                    }
                ]
            };
            await axios.post(`https://localhost:7272/api/interview/slots`, payload);
            setShowModal(false);
            fetchData();
            setNewSlot({ startTime: '', endTime: '' });
        } catch (err) {
            alert("Lỗi khi tạo slot.");
        }
    };

    return (
        <div className="interview-container">
            <div className="max-width-wrapper">
                
                {/* Header Profile - Dùng payload mới */}
                <header className="company-header">
                    <div className="flex-header">
                        {data?.urlLogoImage ? (
                            <img src={data.urlLogoImage} alt="logo" className="company-logo" />
                        ) : (
                            <div className="logo-placeholder"><Building2 size={24} /></div>
                        )}
                        <div>
                            <h1 className="company-name">{data?.nameCompany || "Đang tải..."}</h1>
                            <div className="company-meta">
                                <span className="flex-header" style={{gap: '4px'}}>
                                    <MapPin size={12} /> {data?.address}
                                </span>
                                {data?.urlWebsite && (
                                    <a href={`https://${data.urlWebsite}`} target="_blank" rel="noreferrer" className="flex-header" style={{gap: '4px', color: 'var(--primary)', textDecoration: 'none', marginLeft: '10px'}}>
                                        <Globe size={12} /> Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary" onClick={() => setShowModal(true)}>
                        <Plus size={18} /> <span>Tạo lịch</span>
                    </button>
                </header>

                {/* Filter Toolbar */}
                <div className="filter-toolbar">
                    <div className="filter-group">
                        <label className="filter-label"><Filter size={14} /> Lọc ngày:</label>
                        <input 
                            type="date" 
                            className="filter-date-input"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div style={{fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)'}}>
                        Trang {currentPage} / {data?.numberOfPages || 1}
                    </div>
                </div>

                {/* Main Grid */}
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    <>
                        <div className="slots-grid">
                            {data?.interviewSlotItems?.length > 0 ? (
                                data.interviewSlotItems.map((slot, index) => (
                                    <div key={index} className="slot-card">
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <span className={`status-badge ${slot.isBooked ? 'status-booked' : 'status-free'}`}>
                                                {slot.isBooked ? 'Đã đặt' : 'Sẵn sàng'}
                                            </span>
                                            <span style={{fontSize: '11px', fontWeight: 700, color: '#cbd5e1'}}>#ID-{index + 1}</span>
                                        </div>
                                        
                                        <div className="time-row">
                                            <Clock size={18} style={{color: 'var(--primary)'}} />
                                            {new Date(slot.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            <ChevronRight size={14} style={{color: '#cbd5e1'}} />
                                            {new Date(slot.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                        <div style={{marginTop: '10px', fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px'}}>
                                            <Calendar size={14} /> {new Date(slot.startTime).toLocaleDateString('vi-VN')}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '2px dashed #e2e8f0'}}>
                                    <p style={{color: 'var(--text-muted)'}}>Không có lịch phỏng vấn nào.</p>
                                </div>
                            )}
                        </div>

                        {/* Phân trang (Pagination) */}
                        {data?.numberOfPages > 1 && (
                            <div className="pagination-container">
                                <button 
                                    className="page-btn" 
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                
                                {[...Array(data.numberOfPages)].map((_, i) => (
                                    <button 
                                        key={i} 
                                        className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button 
                                    className="page-btn" 
                                    disabled={currentPage === data.numberOfPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Modal Thêm Lịch (Giữ nguyên như bản trước) */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                                <h3 style={{margin: 0}}>Thêm khung giờ</h3>
                                <X size={20} style={{cursor: 'pointer'}} onClick={() => setShowModal(false)} />
                            </div>
                            <form onSubmit={handleCreateSlot}>
                                <div style={{marginBottom: '15px'}}>
                                    <label style={{display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '5px'}}>Bắt đầu</label>
                                    <input type="datetime-local" required style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: 'inherit'}}
                                        onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})} />
                                </div>
                                <div style={{marginBottom: '15px'}}>
                                    <label style={{display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '5px'}}>Kết thúc</label>
                                    <input type="datetime-local" required style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: 'inherit'}}
                                        onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})} />
                                </div>
                                <div style={{display: 'flex', gap: '10px', marginTop: '25px'}}>
                                    <button type="button" onClick={() => setShowModal(false)} style={{flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#f1f5f9', fontWeight: 700, cursor: 'pointer'}}>Hủy</button>
                                    <button type="submit" className="btn-primary" style={{flex: 2, justifyContent: 'center'}}>Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InterviewPage;