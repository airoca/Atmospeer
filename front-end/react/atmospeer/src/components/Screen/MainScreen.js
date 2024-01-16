import React from 'react';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import './MainScreen.css';

const MainScreen = () => {
  // useNavigate 훅을 사용하여 navigate 함수를 가져옴
  const navigate = useNavigate();

//   const handleImageClick = () => {
//     // navigate 함수를 호출하여 '/login' 경로로 이동
//     navigate('/login');
//   };

  const handleLoginClick = () => {
    // navigate 함수를 호출하여 '/login' 경로로 이동
    navigate('/login');
  };

  const handleSignupClick = () => {
    // navigate 함수를 호출하여 '/signup' 경로로 이동
    navigate('/signup');
  };

  return (
    <div className="main-screen-container">
      {/* <img src={logo} alt="Click me to login" className="main-screen-image" onClick={handleImageClick} /> */}
      <img src={logo} alt="Click me to login" className="main-screen-image" />
      <div className="button-container">
        <button className="login-button" onClick={handleLoginClick}>로그인</button>
        <button className="signup-button" onClick={handleSignupClick}>회원가입</button>
      </div>
    </div>
  );
};

export default MainScreen;
