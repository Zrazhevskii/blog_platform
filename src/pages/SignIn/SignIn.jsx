import React from 'react';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { Link } from 'react-router-dom';

export default function SignIn() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section className="registration__form">
            <div className="registration__form__box registration__form__box_height">
                <span className="registration__form__title registration__form__title_margin-bottom">Sign In</span>
                <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email" className="form__label">
                        Email adress
                        <input
                            {...register('email', {
                                required: 'Поле обязательно к заполнению',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Не валидный адрес',
                                },
                            })}
                            type="email"
                            id="email"
                            className={`${'form__input'} ${errors?.email ? 'form__input_margin-top' : 'form__input form__input_margin'}`}
                            placeholder="Email adress"
                        />
                    </label>
                    <div>{errors?.email && <p className="errors__text">{errors?.email?.message || 'Error'}</p>}</div>
                    <label htmlFor="password" className="form__label">
                        Password
                        <input
                            {...register('password', {
                                required: 'Поле обязательно к заполнению',
                                minLength: {
                                    value: 6,
                                    message: 'Минимум 6 символа',
                                },
                                maxLength: {
                                    value: 40,
                                    message: 'Максимум 40 символов',
                                },
                            })}
                            type="password"
                            id="password"
                            className={`${'form__input'} ${errors?.password ? 'form__input_margin-top' : 'form__input form__input_margin'}`}
                            placeholder="Password"
                        />
                    </label>
                    <div>
                        {errors?.password && <p className="errors__text">{errors?.password?.message || 'Error'}</p>}
                    </div>
                    <button type="submit" className="form__button">
                        Login
                    </button>
                </form>
                <span className="registration__form__footer">
                    Don`t have an account?
                    <Link to="/sign-up" className="registration__form__footer-link">
                        Sign Up
                    </Link>
                </span>
            </div>
        </section>
    );
}
