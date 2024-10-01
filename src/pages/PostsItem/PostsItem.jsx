import './PostsItem.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
// import { NavLink, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { changeUserName } from '../../helpers/changeUserName';

export default function PostsItem({ elem }) {
    // const { slug } = useParams();
    const { slug, title, favoritesCount, tagList, description, createdAt, author } = elem;
    const { username, image } = author;
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';

    return (
        <section className="post__box post__box_shadow-margin">
            <div className="post__box__content">
                <div className="post__box__title-box">
                    <NavLink to={`/articles/${slug}`} className="post__box__title">
                        {title}
                    </NavLink>
                    <div className="post__box__favorites">{favoritesCount}</div>
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
            <div className="post__box__author-box">
                <div className="post__box__name-box">
                    <span className="post__box__name">{changeUserName(username)}</span>
                    <span className="post__box__created">{date}</span>
                </div>
                <img src={image} alt="автор" className="post__box__img" />
            </div>
        </section>
    );
}

PostsItem.propTypes = {
    elem: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
        favoritesCount: PropTypes.number,
        tagList: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        createdAt: PropTypes.string,
        author: PropTypes.shape({
            username: PropTypes.string,
            image: PropTypes.string,
        }),
    }),
};
