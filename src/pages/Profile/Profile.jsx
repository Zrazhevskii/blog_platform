import './Profile.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Alert } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LabelUser from '../../components/Form/LabelUser';
import Email from '../../components/Form/Email';
import { shemaProfile } from '../../components/Form/formSchema';
import Password from '../../components/Form/Password';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../../servises/authUserApi';
// import { toggleError, toggleSucces } from '../../redusers/ArticlesListReduser';
import { toggleSucces } from '../../redusers/ArticlesListReduser';

export default function Profile() {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const { succes, error } = useSelector((state) => state.articles);
    const { data } = useGetCurrentUserQuery();
    const [updateUser] = useUpdateUserMutation();
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(shemaProfile),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
    } = form;

    const changeHeader = () => {
        setTimeout(() => {
            dispatch(toggleSucces(false));
            // setServises((prev) => ({ ...prev, succes: false }));
            // navigate('/');
        }, 1000);
    };

    const onSubmit = async (param) => {
        const request = {
            username: param.username,
            email: param.email,
            password: param.newPassword,
            image: param.urlAvatar,
        };
        // const request = {
        //     email: 'admin@yandex.com',
        //     username: 'admin321',
        //     image: '',
        //     password: 'qazwsx',
        // };
        // console.log(request);

        await updateUser(request)
            .unwrap()
            .then((payload) => {
                console.log('это payload - ', payload);
                changeHeader();
            })
            .catch((err) => {
                console.log('это err - ', err);
                console.log('это err.status - ', err.status);
                if (err.status === 422) {
                    Object.keys(err.data.errors).forEach((field) => {
                        setError(field, {
                            type: 'server',
                            message: `${field} is already taken!`,
                        });
                    });
                }
                if (err.status >= 500) {
                    console.log('я внутри 500');
                    console.log('это err - ', err);
                    console.log('это err.status - ', err.status);
                    // dispatch(toggleError(true));
                }
            });
        // navigate('/');
    };

    useEffect(() => {
        if (data?.username) form.setValue('username', data.username);
        if (data?.email) form.setValue('email', data.email);
    }, [data?.username, data?.email, form]);

    return (
        <section className="profile">
            <section className="registration__form__popup">
                {succes && (
                    <Alert message="Success!" type="success" description="Вы успешно изменили профиль!" showIcon />
                )}
            </section>
            <section className="errors">
                {error && (
                    <Alert
                        message="Error!"
                        type="error"
                        description="Что-то пошло не так, перегрузите страницу..."
                        showIcon
                    />
                )}
            </section>
            <span className="profile__title">Edit Profile</span>
            <form className="form">
                <LabelUser form={form} name="username" />
                <Email form={form} name="email" />
                <Password form={form} name="newPassword" title="New Password" />
                <label htmlFor="password" className="form__label">
                    Avatar image(url)
                    <input
                        {...register('urlAvatar')}
                        type="text"
                        id="urlAvatar"
                        className={`${'form__input'} ${errors?.urlAvatar ? 'form__input_margin-top' : 'form__input_margin'}`}
                        placeholder="Avatar image"
                    />
                    <div>
                        {errors?.urlAvatar && <p className="errors__text">{errors?.urlAvatar?.message || 'Error'}</p>}
                    </div>
                </label>
                <button type="submit" className="form__button" onClick={handleSubmit(onSubmit)}>
                    Save
                </button>
            </form>
        </section>
    );
}
