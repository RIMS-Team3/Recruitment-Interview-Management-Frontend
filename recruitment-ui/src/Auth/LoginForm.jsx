import React, { useState } from 'react';
import { Github, Mail, Lock, LogIn, Code2, Eye, EyeOff, UserPlus, User } from 'lucide-react';
import './LoginStyles.css';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
        <div className="marquee-wrapper">
    <div className="marquee-text">
    <span>Bùi Xuân Huấn</span> - Ra xã hội làm ăn bươn trải, có làm thì mới có ăn. Không làm mà đòi có ăn thì ăn đầu buồi, ăn cứt.
    </div>
  </div>
      <div className="login-card">
        {/* Header Section */}
        <div className="login-header">
          <div className="logo-box">
            <Code2 size={32} color="#00b14f" />
          </div>
          <h1>DevHire <span className="text-gradient">IT LOCAK</span></h1>
          <p className='s'>{isLogin ? 'Nâng tầm sự nghiệp Software Engineer' : 'Gia nhập cộng đồng Developer tài năng'}</p>
        </div>

        {/* Social Login */}
        <div className="social-group">
          <button className="btn-social"><Github size={18} /> GitHub</button>
          <button className="btn-social"><Mail size={18} /> Google</button>
        </div>

        <div className="divider">
          <span>HOẶC TIẾP TỤC VỚI</span>
        </div>

        {/* Form Section */}
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          
          {!isLogin && (
            <div className="input-group">
              <label>Họ và tên</label>
              <div className="input-wrapper">
                <User className="input-icon-left" size={18} />
                <input type="text" placeholder="Nguyễn Văn A" />
              </div>
            </div>
          )}

          <div className="input-group">
            <label>Email công việc</label>
            <div className="input-wrapper">
              <Mail className="input-icon-left" size={18} />
              <input type="email" placeholder="name@company.com" />
            </div>
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>Mật khẩu</label>
              {isLogin && <a href="#forgot" className="link-sm">Quên mật khẩu?</a>}
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon-left" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                className="btn-eye" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            {isLogin ? (
              <>Truy cập bảng tin IT <LogIn size={18} /></>
            ) : (
              <>Tạo tài khoản ngay <UserPlus size={18} /></>
            )}
          </button>
        </form>

        {/* Footer Section */}
        <div className="footer-toggle">
          <p className="footer-text">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{' '}
            <span className="btn-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </span>
          </p>
          {isLogin && (
            <p className="footer-text">
              Bạn là nhà tuyển dụng? <a href="#recruiter">Đăng tin tại đây</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;