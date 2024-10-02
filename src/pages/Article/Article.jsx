// import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import './Article.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { changeUserName } from '../../helpers/changeUserName';
import { useGetArticleItemQuery } from '../../servises/articlesApi';
import Modal from '../../components/Modal/index';

export default function Article() {
    const [showModal, setShowModal] = useState(false);
    const inAccount = useSelector((state) => state.articles.inAccount);
    console.log(inAccount);
    const { slug } = useParams();
    const { data, isLoading, isSuccess } = useGetArticleItemQuery(slug);

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

    const { title, favoritesCount, body, tagList, description, createdAt, author } = data.article;
    const { username, image } = author;
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';

    return (
        isSuccess && (
            <section className="article__wrapper">
                <div className="post__box">
                    <div className="post__box__content">
                        <div className="post__box__title-box">
                            <NavLink to="/article" className="post__box__title">
                                {title}
                            </NavLink>
                            <div className="post__box__favorites">{favoritesCount}</div>
                        </div>
                        <div className="post__box__tags-box">
                            {tagList?.length
                                ? tagList.map((item) => {
                                      return (
                                          <span key={uuidv4()} className="post__box__tag">
                                              {item}
                                          </span>
                                      );
                                  })
                                : 'без тегов'}
                        </div>
                        <div className="post__box__description">{description}</div>
                    </div>
                    <div className="post__box__author-wrapper">
                        <div className="post__box__author-box post__box__author-box_width">
                            <div className="post__box__name-box">
                                <span className="post__box__name">{changeUserName(username)}</span>
                                <span className="post__box__created">{date}</span>
                            </div>
                            <img src={image} alt="автор" className="post__box__img" />
                        </div>
                        {inAccount && (
                            <div className="box__btns">
                                <button
                                    type="button"
                                    className="box__btns__delete"
                                    onClick={() => handleChangeShowModal(true)}
                                >
                                    Delete
                                </button>
                                {showModal && <Modal slug={slug} handleChangeShowModal={handleChangeShowModal} />}
                                <button type="button" className="box__btns__edit">
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="article__content">{body}</div>
            </section>
        )
    );
}
