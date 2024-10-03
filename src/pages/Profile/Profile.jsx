import './Profile.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LabelUser from '../../components/Form/LabelUser';
import Email from '../../components/Form/Email';
import { shemaProfile } from '../../components/Form/formSchema';
import Password from '../../components/Form/Password';

export default function Profile() {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(shemaProfile),
    });

    const {
        register,
        formState: { errors },
    } = form;
    return (
        <section className="profile">
            <span className="profile__title">Edit Profile</span>
            <form action="" className="form">
                <LabelUser form={form} name="username" />
                <Email form={form} name="email" />
                <Password form={form} name="newPassword" title="New Password" />
                <label htmlFor="password" className="form__label">
                    Avatar image(url)
                    <input
                        {...register('urlAvatar')}
                        type="password"
                        id="urlAvatar"
                        className={`${'form__input'} ${errors?.urlAvatar ? 'form__input_margin-top' : 'form__input_margin'}`}
                        placeholder="Avatar image"
                    />
                    <div>
                        {errors?.urlAvatar && <p className="errors__text">{errors?.urlAvatar?.message || 'Error'}</p>}
                    </div>
                </label>
                <button type="submit" className="form__button">
                    Save
                </button>
            </form>
        </section>
    );
}
