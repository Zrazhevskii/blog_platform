import './ArticleTitleBox.css';
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useAddFavoriteMutation, useDeletFavoriteMutation } from '../../servises/articlesApi';

export default function ArticleTitleBox({ elem, isArticle = true }) {
    const [addFavorite] = useAddFavoriteMutation();
    const [deletFavorite] = useDeletFavoriteMutation();
    const { slug, title, favoritesCount, tagList, description, favorited } = elem;

    const toggleFavorite = () => {
        if (!favorited) {
            addFavorite(slug);
        } else {
            deletFavorite(slug);
        }
    };
    return (
        <div className="post__box__content">
            <div className="post__box__title-box">
                {isArticle ? (
                    <span className="post__box__title">{title}</span>
                ) : (
                    <Link to={`/articles/${slug}`} className="post__box__title">
                        {title}
                    </Link>
                )}
                <button
                    type="button"
                    className={`post__box__btn ${!favorited ? 'post__box__unfavorites' : 'post__box__favorites'}`}
                    onClick={toggleFavorite}
                >
                    {favoritesCount}
                </button>
            </div>
            <div className="post__box__tags-box">
                {tagList.length
                    ? tagList.map((item) => {
                          return (
                              <span key={uuidv4()} className="post__box__tag">
                                  {item}
                              </span>
                          );
                      })
                    : 'без тегов'}
            </div>
            <div className="post__box__description">{description.split(' ').slice(0, 50).join(' ')}</div>
        </div>
    );
}

ArticleTitleBox.propTypes = {
    elem: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        favoritesCount: PropTypes.number,
        tagList: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        createdAt: PropTypes.string,
        favorited: PropTypes.bool,
    }),
    isArticle: PropTypes.bool,
};
