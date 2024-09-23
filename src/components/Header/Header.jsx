// import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="header__title__box">
                <button type="button" className="header__title__text" onClick={() => navigate('/')}>
                    Realworld Blog
                </button>
            </div>
            <div className="header__links__box">
                <NavLink to="/sign-in" className="header__link">
                    Sign In
                </NavLink>
                <NavLink to="/sign-up" className="header__link">
                    Sign Up
                </NavLink>
            </div>
        </div>
    );
}
