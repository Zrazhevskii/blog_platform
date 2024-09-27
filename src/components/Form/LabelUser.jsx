import React from 'react';
import PropTypes from 'prop-types';
// import { message } from 'antd';

export default function LabelUser({ form, name }) {
    // console.log(name);
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <label htmlFor="username" className="form__label">
            Username
            <input
                {...register(name)}
                id="username"
                className={`${'form__input'} ${errors?.[name] ? 'form__input_margin-top' : 'form__input form__input_margin'}`}
                placeholder="Username"
            />
            <div>{errors?.[name] && <p className="errors__text">{errors?.[name]?.message || 'Error'}</p>}</div>
        </label>
    );
}

LabelUser.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                username: PropTypes.shape({
                    type: PropTypes.string,
                    message: PropTypes.string,
                }),
            }),
        }),
    }),
    name: PropTypes.string,
};
