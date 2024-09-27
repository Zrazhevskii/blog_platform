import React from 'react';
import PropTypes from 'prop-types';

export default function Checkbox({ form, name }) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <>
            <label htmlFor="checkbox" className="form__label-checkbox">
                <input {...register(name)} type="checkbox" id={name} name="toggle" className="form__checkbox" />
                <span className="form__label-text">I agree to the processing of my personal information</span>
            </label>
            <div>
                {errors?.[name] && (
                    <p className="errors__text errors__text_margin">{errors?.[name]?.message || 'Error'}</p>
                )}
            </div>
        </>
    );
}

Checkbox.propTypes = {
    form: PropTypes.shape({
        register: PropTypes.func,
        formState: PropTypes.shape({
            errors: PropTypes.shape({
                toggle: PropTypes.shape({
                    type: PropTypes.string,
                    message: PropTypes.string,
                }),
            }),
        }),
    }),
    name: PropTypes.string,
};
