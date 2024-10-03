import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleInAccount } from '../../redusers/ArticlesListReduser';
import { shemaSignIn } from '../../components/Form/formSchema';
import './SignIn.css';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import { useGetExistingUserMutation } from '../../servises/authUserApi';

export default function SignIn() {
    const [getExistingUser] = useGetExistingUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(shemaSignIn),
    });
    const { handleSubmit, reset, setError } = form;

    const onSubmit = async (data) => {
        const request = { user: { email: data.email, password: data.password } };
        console.log(request);
        await getExistingUser(request)
            .unwrap()
            .then((payload) => {
                console.log('fulfilled', payload);
                localStorage.setItem('token', payload.user.token);
                dispatch(toggleInAccount(true));
                reset();
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 422) {
                    console.log('это err - ', err);
                    ['email', 'password'].forEach((field) => {
                        setError(field, {
                            type: 'server',
                            message: 'email or password is invalid',
                        });
                    });
                }
                if (err.status >= 500) {
                    console.log('Это ошибка 500 - ', err);
                }
            });
    };

    return (
        <section className="registration__form">
            <div className="registration__form__box registration__form__box_height">
                <span className="registration__form__title registration__form__title_margin-bottom">Sign In</span>
                <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                    <Email form={form} name="email" />
                    <Password form={form} name="password" title="Password" />
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
