import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export default function Email({ form, name }) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <label htmlFor="email" className="form__label">
            Email adress
            <input
                {...register(name)}
                type="email"
                id={name}
                className={`${'form__input'} ${errors?.[name] ? 'form__input_margin-top' : 'form__input form__input_margin'}`}
                placeholder="Email adress"
            />
            <div>{errors?.[name] && <p className="errors__text">{errors?.[name]?.message || 'Error'}</p>}</div>
        </label>
    );
}

Email.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                email: PropTypes.shape({
                    type: PropTypes.string,
                    message: PropTypes.string,
                }),
            }),
        }),
    }),
    name: PropTypes.string,
};
