// import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import './Article.css';
import { changeUserName } from '../../helpers/changeUserName';
import { useGetArticleItemQuery } from '../../servises/articlesApi';

export default function Article() {
    // const data = {
    //     article: {
    //         slug: 'how-to-train-your-dragon',
    //         title: 'How to train your dragon',
    //         description: 'Ever wonder how?',
    //         body: 'It takes a Jacobian',
    //         tagsList: ['dragons', 'training'],
    //         createdAt: '2024-05-04T09:42:00+00:00',
    //         updatedAt: '2024-05-04T09:42:00+00:00',
    //         favorited: false,
    //         favoritesCount: 42,
    //         author: {
    //             bio: 'I work at State Farm.',
    //             image: 'https://api.realworld.io/images/smiley-cyrus.jpg',
    //             username: 'jake',
    //             following: false,
    //         },
    //     },
    // };
    const { slug } = useParams();
    const { data, isLoading, isSuccess } = useGetArticleItemQuery(slug);
    // console.log(data);

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    const { title, favoritesCount, body, tagList, description, createdAt, author } = data.article;
    const { username, image } = author;
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';
    // console.log(typeof body);

    return (
        isSuccess && (
            <section className="article__wrapper">
                <div className="post__box">
                    <div className="post__box__content">
                        <div className="post__box__title__box">
                            <NavLink to="/article" className="post__box__title">
                                {title}
                            </NavLink>
                            <div className="post__box__favorites">{favoritesCount}</div>
                        </div>
                        <div className="post__box__tags__box">
                            {tagList?.length
                                ? tagList.map((item) => {
                                      return (
                                          <span key={item} className="post__box__tag">
                                              {item}
                                          </span>
                                      );
                                  })
                                : 'без тегов'}
                        </div>
                        <div className="post__box__description">{description}</div>
                    </div>
                    <div className="post__box__author__box">
                        <div className="post__box__name__box">
                            <span className="post__box__name">{changeUserName(username)}</span>
                            <span className="post__box__created">{date}</span>
                        </div>
                        <img src={image} alt="автор" className="post__box__img" />
                    </div>
                </div>
                <div className="article__content">{body}</div>
            </section>
        )
    );
}
