// import React from 'react';
import './PageNotFound.css';

export default function PageNotFound() {
    return (
        <div className="not__found">
            <span className="not__found__error">...Ошибка 404</span>
            <span className="not__found__text">Ой, запрашиваемая страница не найдена</span>
        </div>
    );
}
