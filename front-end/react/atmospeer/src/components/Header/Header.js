import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './Header.css';

export default function Header({ isLoggedIn, handleLogout }) {

    return (
        <div className="Header">
            <header>
                <div className="header-container">
                    <div className="logo-container">
                        <h1><Link to="/" className="logo"><img src={logo} alt="Logo" width="150px"/></Link></h1>
                    </div>
                    {isLoggedIn ? (
                        <nav>
                            <ul>
                                <li><button onClick={handleLogout}><Link to="/">로그아웃</Link></button></li>
                            </ul>
                        </nav>
                    ) : (
                        <nav>
                            <ul>
                                <li><button><Link to="/login">로그인</Link></button></li>
                                <li><button><Link to="/signup">회원가입</Link></button></li>
                            </ul>
                        </nav>
                    )}
                </div>
            </header>
        </div>
    );
};
