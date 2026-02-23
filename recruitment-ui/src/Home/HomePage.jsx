import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, ChevronRight, Zap, Facebook, 
  Linkedin, Mail, Phone, TrendingUp, Award, 
  Users, ArrowRight 
} from 'lucide-react';
import './HomePage.css';

// --- COMPONENT MỚI: HIỆU ỨNG CHẠY SỐ ---
const CountUpNumber = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Tính toán giá trị hiện tại
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isStarted, end, duration]);

  // Format số có dấu phẩy: 12500 -> 12,500
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return <h4 ref={elementRef}>{formatNumber(count)}+</h4>;
};
// ----------------------------------------

const HomePage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  const banners = [
    { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200", title: "Kết nối sự nghiệp mơ ước" },
    { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200", title: "Hơn 5000+ Job IT mới mỗi ngày" },
    { url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200", title: "Phát triển cùng RecruitFree" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const jobs = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: i % 2 === 0 ? "Senior Frontend Developer" : "Backend Engineer (NodeJS/Go)",
    company: "Vibed Code Tech",
    salary: i % 3 === 0 ? "30 - 50 triệu" : "15 - 25 triệu",
    loc: i % 2 === 0 ? "Hà Nội" : "TP. Hồ Chí Minh",
    tags: ["ReactJS", "TypeScript", "English"],
    postedAt: "2 giờ trước",
    hot: i < 4
  }));

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">🚀 Nền tảng tuyển dụng thế hệ mới</div>
          <h1 className="hero-title">Tìm kiếm công việc <span className="text-gradient">Software Engineer</span> tốt nhất</h1>
          <p className="hero-subtitle">Hơn 2,000+ vị trí đang chờ bạn ứng tuyển ngay hôm nay.</p>
          
          <div className="search-box-wrapper">
            <div className="search-main-modern">
              <div className="input-with-icon">
                <Search className="icon" size={20} />
                <input type="text" placeholder="Vị trí, kỹ năng hoặc tên công ty..." />
              </div>
              <div className="divider"></div>
              <div className="input-with-icon">
                <MapPin className="icon" size={20} />
                <select>
                  <option>Tất cả địa điểm</option>
                  <option>Hà Nội</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>
              <button className="btn-search-prime">Tìm kiếm ngay</button>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Slider */}
      <div className="container">
        <div className="banner-slider-modern">
          {banners.map((banner, index) => (
            <div 
              key={index} 
              className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
              style={{ backgroundImage: `url(${banner.url})` }}
            >
              <div className="banner-text-overlay">
                <h2>{banner.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section - ĐÃ CẬP NHẬT HIỆU ỨNG CHẠY SỐ */}
      <section className="stats-section container">
        <div className="stat-card">
          <TrendingUp className="stat-icon" />
          <div>
            <CountUpNumber end={12500} />
            <p>Việc làm active</p>
          </div>
        </div>
        
        <div className="stat-card">
          <Award className="stat-icon" />
          <div>
            <CountUpNumber end={500} />
            <p>Công ty hàng đầu</p>
          </div>
        </div>
        
        <div className="stat-card">
          <Users className="stat-icon" />
          <div>
            <CountUpNumber end={200000} />
            <p>Ứng viên tin dùng</p>
          </div>
        </div>
      </section>

      {/* Job Grid Section - HIỂN THỊ FULL MÀN HÌNH */}
      <section className="job-grid-section container-fluid">
        <div className="section-header-modern">
          <div className="header-left">
            <h2 className="modern-section-title">
              Việc làm <span className="text-highlight">mới nhất</span>
              <span className="title-line"></span>
            </h2>
          </div>
          <a href="#" className="link-all" style={{textDecoration: 'none', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '5px'}}>
            Xem tất cả công việc <ChevronRight size={16} />
          </a>
        </div>

        <div className="job-grid-modern">
          {jobs.map(job => (
            <div key={job.id} className={`job-card-modern ${job.hot ? 'hot-border' : ''}`}>
              {job.hot && <span className="hot-tag"><Zap size={12} fill="currentColor"/> HOT</span>}
              <div className="card-top">
                <div className="company-logo-modern">{job.company.charAt(0)}</div>
                <div className="title-area">
                  <h4 className="job-title-text" title={job.title}>{job.title}</h4>
                  <p className="company-text" style={{fontSize: '14px', color: 'var(--text-gray)', margin: 0}}>{job.company}</p>
                </div>
              </div>
              
              <div className="job-tags-row">
                {job.tags.map(tag => <span key={tag} className="skill-tag">{tag}</span>)}
              </div>

              <div className="card-bottom-modern">
                <div className="job-meta">
                  <span className="salary-modern">{job.salary}</span>
                  <span style={{color: '#cbd5e1', margin: '0 8px'}}>•</span>
                  <span style={{fontSize: '14px', color: 'var(--text-gray)'}}>{job.loc}</span>
                </div>
                <span className="posted-time">{job.postedAt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="load-more-wrapper">
          <button className="btn-modern-explore">
            Khám phá thêm cơ hội
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="container-fluid footer-grid">
          <div className="footer-brand">
            <h2 className="logo-text">IT<span>LoCak</span></h2>
            <p style={{lineHeight: 1.6}}>Nâng tầm sự nghiệp lập trình viên Việt Nam với những cơ hội tốt nhất từ các tập đoàn công nghệ.</p>
            <div className="social-links" style={{display: 'flex', gap: '15px', marginTop: '20px'}}>
              <Facebook size={20} style={{cursor: 'pointer'}} />
              <Linkedin size={20} style={{cursor: 'pointer'}} />
              <Mail size={20} style={{cursor: 'pointer'}} />
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Dành cho ứng viên</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '10px'}}>Việc làm IT mới nhất</li>
              <li style={{marginBottom: '10px'}}>Tạo CV chuyên nghiệp</li>
              <li style={{marginBottom: '10px'}}>Cẩm nang nghề nghiệp</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Hỗ trợ</h4>
            <ul style={{listStyle: 'none', padding: 0}}>
              <li style={{marginBottom: '10px'}}>Trung tâm trợ giúp</li>
              <li style={{marginBottom: '10px'}}>Điều khoản dịch vụ</li>
              <li style={{marginBottom: '10px'}}>Chính sách bảo mật</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Liên hệ</h4>
            <p style={{display: 'flex', alignItems: 'center', gap: '10px'}}><Phone size={16} /> 1900 888 999</p>
            <p style={{display: 'flex', alignItems: 'center', gap: '10px'}}><Mail size={16} /> career@recruitfree.vn</p>
            <p style={{fontSize: '14px', marginTop: '10px'}}>Tòa nhà VibedCode, Cầu Giấy, Hà Nội</p>
          </div>
        </div>
        
        <div className="footer-bottom-bar">
          <div className="container-fluid flex-between">
            <p style={{margin: 0}}>© 2026 RecruitFree Platform. All rights reserved.</p>
            <p style={{margin: 0}}>Made with ❤️ by Pham Trung Duc</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;