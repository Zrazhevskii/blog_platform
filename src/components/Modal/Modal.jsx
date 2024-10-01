// import React from 'react'
import './Modal.css';
import PropTypes from 'prop-types';

export default function Modal({ slug, handleChangeShowModal }) {
    const handleDeletAticle = () => {
        console.log(slug);
    };
    return (
        <div className="modal">
            <div className="modal__text-box">
                <div className="modal__icon" />
                <div className="modal__text">Are you sure to delete this article?</div>
            </div>
            <div className="modal__btns">
                <button type="button" className="modal__btn-nodelete" onClick={() => handleChangeShowModal(false)}>
                    No
                </button>
                <button type="button" className="modal__btn-delete" onClick={handleDeletAticle}>
                    Yes
                </button>
            </div>
        </div>
    );
}

Modal.propTypes = {
    handleChangeShowModal: PropTypes.func,
    slug: PropTypes.string,
};
