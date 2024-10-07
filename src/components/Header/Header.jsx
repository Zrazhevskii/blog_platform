import { useNavigate, NavLink, Link } from 'react-router-dom';
import './Header.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from '../../servises/authUserApi';
import imgProfile from '../../assets/imgProfile.png';
import { toggleInAccount } from '../../redusers/ArticlesListReduser';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data } = useGetCurrentUserQuery();
    // console.log(data);
    const storage = localStorage.getItem('token');
    const inAccount = useSelector((state) => state.articles.inAccount);
    useEffect(() => {
        if (storage) {
            dispatch(toggleInAccount(true));
        }
    }, [storage, dispatch]);

    return (
        <header className="header">
            <div className="header__title-box">
                <button type="button" className="header__title-text" onClick={() => navigate('/')}>
                    Realworld Blog
                </button>
            </div>
            <div className="header__links-box">
                {inAccount ? (
                    <>
                        <Link to="/new-article" className="header__link header__link_create-style">
                            Create article
                        </Link>
                        <Link to="/profile" className="header__link header__link_profile-style">
                            {data?.username}
                        </Link>
                        <div className="header__image">
                            <img src={data?.image || imgProfile} alt="profile" />
                        </div>
                        <button
                            type="button"
                            className="header__logout"
                            onClick={() => {
                                localStorage.removeItem('token');
                                dispatch(toggleInAccount(false));
                                navigate('/');
                            }}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/sign-in" className="header__link header__link_sign-style">
                            Sign In
                        </NavLink>
                        <NavLink to="/sign-up" className="header__link header__link_sign-style">
                            Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </header>
    );
}
