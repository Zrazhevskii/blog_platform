import { Link, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { format } from 'date-fns';
import './Article.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { changeUserName } from '../../helpers/changeUserName';
import { useGetArticleItemQuery } from '../../servises/articlesApi';
import Modal from '../../components/Modal/index';
import { useGetCurrentUserQuery } from '../../servises/authUserApi';
import ArticleTitleBox from '../../components/ArticleTitleBox';

export default function Article() {
    const [showModal, setShowModal] = useState(false);
    const inAccount = useSelector((state) => state.articles.inAccount);
    const { slug } = useParams();
    const { data, isLoading, isSuccess } = useGetArticleItemQuery(slug);
    const { data: dataUser } = useGetCurrentUserQuery();

    if (isLoading) {
        return (
            <div className="loader">
                <PuffLoader color="#52c4a1" size={130} />
            </div>
        );
    }

    const handleChangeShowModal = (bool) => {
        setShowModal(bool);
    };

    const { body, createdAt, author } = data.article;
    const { username, image } = author;
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';

    return (
        isSuccess && (
            <section className="article">
                <div className="post__box">
                    <ArticleTitleBox elem={data.article} />
                    <div className="post__box__author-wrapper">
                        <div className="post__box__author-box post__box__author-box_width">
                            <div className="post__box__name-box">
                                <span className="post__box__name">{changeUserName(username)}</span>
                                <span className="post__box__created">{date}</span>
                            </div>
                            <img src={image} alt="автор" className="post__box__img" />
                        </div>
                        {inAccount && dataUser.username === username && (
                            <div className="box__btns">
                                <button
                                    type="button"
                                    className="box__btns__delete"
                                    onClick={() => handleChangeShowModal(true)}
                                >
                                    Delete
                                </button>
                                {showModal && <Modal slug={slug} handleChangeShowModal={handleChangeShowModal} />}
                                <Link to={`/articles/${slug}/edit`} className="box__btns__edit">
                                    Edit
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="article__content">{body}</div>
            </section>
        )
    );
}
