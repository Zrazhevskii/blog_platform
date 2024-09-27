// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import LabelUser from '../../components/Form/LabelUser';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import Checkbox from '../../components/Form/Checkbox';
import { schema } from '../../components/Form/formSchema';

export default function SignUp() {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <section className="registration__form">
            <div className="registration__form__box registration__form__box_high">
                <span className="registration__form__title registration__form__title_margin-bottom">Sign Up</span>
                <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                    <LabelUser form={form} name="username" />
                    <Email form={form} name="email" />
                    <Password form={form} name="password" />
                    <Password form={form} name="repeatPassword" />
                    <Checkbox form={form} name="toggle" />
                    <button type="submit" className="form__button">
                        Create
                    </button>
                </form>
                <span className="registration__form__footer">
                    Already have an account?
                    <Link to="/sign-in" className="registration__form__footer-link">
                        Sign In
                    </Link>
                </span>
            </div>
        </section>
    );
}
