import React from 'react';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import './MainScreen.css';

const MainScreen = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleBackClick = () => {
    navigate('/chat');
  };

  return (
    <div className="main-screen-container">
      <img src={logo} alt="Click me to login" className="main-screen-image" />
      {isLoggedIn === false ? (
        <div className="button-container">
          <button className="login-button" onClick={handleLoginClick}>
            로그인
          </button>
          <button className="signup-button" onClick={handleSignupClick}>
            회원가입
          </button>
        </div>
      ) : (
        <div className="button-container">
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
          <button className="back-button" onClick={handleBackClick}>
            돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
