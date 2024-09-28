import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export default function Password({ form, name }) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <label htmlFor="password" className="form__label">
            Password
            <input
                {...register(name)}
                type="password"
                id={name}
                className={`${'form__input'} ${errors?.[name] ? 'form__input_margin-top' : 'form__input_margin'}`}
                placeholder="Password"
            />
            <div>{errors?.[name] && <p className="errors__text">{errors?.[name]?.message || 'Error'}</p>}</div>
        </label>
    );
}

Password.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                password: PropTypes.shape({
                    type: PropTypes.string,
                    message: PropTypes.string,
                }),
            }),
        }),
    }),
    name: PropTypes.string,
};
