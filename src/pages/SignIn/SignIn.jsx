import React from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
// import { shemaSignIn } from '../../components/Form/formSchema';
import './SignIn.css';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';

export default function SignIn() {
    const form = useForm({
        mode: 'onChange',
        // resolver: yupResolver(shemaSignIn),
    });
    const { handleSubmit } = form;

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section className="registration__form">
            <div className="registration__form__box registration__form__box_height">
                <span className="registration__form__title registration__form__title_margin-bottom">Sign In</span>
                <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                    <Email form={form} name="email" />
                    <Password form={form} name="password" />
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
