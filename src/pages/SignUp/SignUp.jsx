import { useForm } from 'react-hook-form';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from 'antd';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleInAccount, toggleSucces, toggleError } from '../../redusers/ArticlesListReduser';
import LabelUser from '../../components/Form/LabelUser';
import Email from '../../components/Form/Email';
import Password from '../../components/Form/Password';
import Checkbox from '../../components/Form/Checkbox';
import { schemaSighUp } from '../../components/Form/formSchema';
import { useRegisterUserMutation } from '../../servises/authUserApi';

export default function SignUp() {
    const { succes, error } = useSelector((state) => state.articles);
    const dispatch = useDispatch();
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaSighUp),
    });

    const changeHeader = () => {
        setTimeout(() => {
            dispatch(toggleInAccount(true));
            dispatch(toggleSucces(false));
            navigate('/');
        }, 2000);
    };

    const { handleSubmit, reset, setError } = form;

    const onSubmit = async (data) => {
        const request = {
            user: { username: data.username, email: data.email, password: data.password },
        };
        await registerUser(request)
            .unwrap()
            .then((payload) => {
                localStorage.setItem('token', payload.user.token);
                dispatch(toggleSucces(true));
                changeHeader();
                reset();
            })
            .catch((err) => {
                if (err.status === 422) {
                    Object.keys(err.data.errors).forEach((field) => {
                        setError(field, {
                            type: 'server',
                            message: `${field} is already taken!`,
                        });
                    });
                }
                if (err.status >= 500) {
                    dispatch(toggleError(true));
                }
            });
    };

    return (
        <section className="registration__form">
            <section className="registration__form__popup">
                {succes && (
                    <Alert message="Success!" type="success" description="Вы успешно прошли регистрацию!" showIcon />
                )}
            </section>
            <section className="registration__form__error">
                {error && (
                    <Alert
                        message="Error!"
                        type="error"
                        description="Что-то пошло не так, перегрузите страницу..."
                        showIcon
                    />
                )}
            </section>
            <div className="registration__form__box registration__form__box_high">
                <span className="registration__form__title registration__form__title_margin-bottom">
                    Create new account
                </span>
                <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                    <LabelUser form={form} name="username" />
                    <Email form={form} name="email" />
                    <Password form={form} name="password" title="Password" />
                    <Password form={form} name="repeatPassword" title="Repeat Password" />
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
