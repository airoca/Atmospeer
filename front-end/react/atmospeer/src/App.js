import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'; // App.css 파일 추가
import RoomDetail from './components/Room/RoomDetail';
import MainScreen from './components/Screen/MainScreen';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserID, setLoggedInUserID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setIsLoggedIn(true);
      setLoggedInUserID(storedUserID);
    }
  }, []); // 새로고침 버그 수정

  const handleLogin = (userID) => {
    // 로그인 성공 시 호출되는 함수
    setIsLoggedIn(true);
    setLoggedInUserID(userID); // 로그인한 사용자의 ID를 상태로 저장
    localStorage.setItem('userID', userID);
  };

  const handleLogout = () => {
    // 로그아웃 시 호출되는 함수
    setIsLoggedIn(false);
    setLoggedInUserID(null);
    localStorage.removeItem('userID');
  };

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && (
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}

      <Routes>
        <Route
          path="/"
          element={<MainScreen isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
        />
        <Route path="/chat" element={<Chat userID={loggedInUserID} />} />
        <Route path="/signup" element={<Signup />} />
        {/* RoomDetail 페이지에 대한 라우트 */}
        <Route path="/room/:roomId" element={<RoomDetail />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
      </Routes>
    </div>
  );
};

export default App;
