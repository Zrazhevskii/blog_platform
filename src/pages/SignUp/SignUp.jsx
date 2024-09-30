// import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'antd';
import { useEffect, useState } from 'react';
import LabelUser from '../../components/Form/LabelUser';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import Checkbox from '../../components/Form/Checkbox';
import { schemaSighUp } from '../../components/Form/formSchema';
import { useRegisterUserMutation } from '../../servises/authUserApi';

// export const errorFunc = (bool) => {
//     return bool;
// };

export default function SignUp() {
    const [registerUser, { isSuccess, isError }] = useRegisterUserMutation();
    // const navigator
    const [succes, setSucces] = useState(isSuccess);
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaSighUp),
    });

    const { setError } = form;

    useEffect(() => {
        let interval;
        if (isSuccess) {
            console.log(isSuccess);
            interval = setTimeout(() => {
                setSucces(false);
            }, 2000);
        }
        return clearTimeout(interval);
    }, [isSuccess]);

    const { handleSubmit, reset } = form;

    const onSubmit = async (data) => {
        const request = {
            user: { username: data.username, email: data.email, password: data.password },
        };
        await registerUser(request)
            .unwrap()
            .then((payload) => {
                console.log('fulfilled', payload);
                localStorage.setItem('token', payload.user.token);
                setSucces(true);
                reset();
            })
            .catch((err) => {
                // console.error('rejected тут - ', Object.keys(err.data.errors));
                if (err.status === 422) {
                    Object.keys(err.data.errors).forEach((field) => {
                        setError(field, {
                            type: 'server',
                            message: `${field} is already taken!`,
                        });
                    });
                }
                // console.log(isError);
            });
        // reset();
        // console.log(response);
    };

    if (isError) {
        console.log(isError);
        return (
            <Alert message="Error" description="Что-то пошло не так, перегрузите страницу..." type="error" showIcon />
        );
    }

    return (
        <section className="registration__form">
            <section className="registration__form__popup">
                {succes && (
                    <Alert message="Success!" type="success" description="Вы успешно прошли регистрацию!" showIcon />
                )}
            </section>
            <div className="registration__form__box registration__form__box_high">
                <span className="registration__form__title registration__form__title_margin-bottom">
                    Create new account
                </span>
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
