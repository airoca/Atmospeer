// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './Header.css';

export default function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Chat.js에서 상태 초기화
    navigate('/chat', { state: { resetState: true } });
  };

  return (
    <div className="Header">
      <header>
        <div className="header-container">
          <div className="logo-container">
            <h1>
              <Link to="/" className="logo" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" width="150px" />
              </Link>
            </h1>
          </div>
          {isLoggedIn ? (
            <nav>
              <ul>
                <li>
                  <button>
                    <Link to="/chat">AtmosPEER</Link>
                  </button>
                </li>
                <li>
                <Link to="/"><button onClick={handleLogout}>로그아웃</button></Link>
                </li>
              </ul>
            </nav>
          ) : (
            <nav>
              <ul>
                <li>
                  <button>
                    <Link to="/login">로그인</Link>
                  </button>
                </li>
                <li>
                  <button>
                    <Link to="/signup">회원가입</Link>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
}
