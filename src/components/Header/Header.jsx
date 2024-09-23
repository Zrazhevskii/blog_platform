// import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="header__title__box">
                <span>Realworld Blog</span>
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
