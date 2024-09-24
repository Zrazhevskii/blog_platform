import './Post.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export default function Post({ elem }) {
    const { title, favoritesCount, tags, description, createdAt, author } = elem;
    const { username, image } = author;
    const user = username
        .split(' ')
        .map((el) => el.slice(0, 1).toUpperCase() + el.slice(1))
        .join(' ');
    // console.log(user);
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';

    return (
        <section className="post__box">
            <div className="post__box__content">
                <div className="post__box__title__box">
                    <h4 className="post__box__title">{title}</h4>
                    <div className="post__box__favorites">{favoritesCount}</div>
                </div>
                <div className="post__box__tags__box">
                    {tags.map((item) => {
                        return (
                            <span key={item} className="post__box__tag">
                                {item}
                            </span>
                        );
                    })}
                </div>
                <div className="post__box__description">{description.split(' ').slice(0, 10).join(' ')}</div>
            </div>
            <div className="post__box__author__box">
                <div className="post__box__name__box">
                    <span className="post__box__name">{user}</span>
                    <span className="post__box__created">{date}</span>
                </div>
                <img src={image} alt="автор" className="post__box__img" />
            </div>
        </section>
    );
}

Post.propTypes = {
    elem: PropTypes.shape({
        title: PropTypes.string,
        favoritesCount: PropTypes.number,
        tags: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        createdAt: PropTypes.string,
        author: PropTypes.shape({
            username: PropTypes.string,
            image: PropTypes.string,
        }),
    }),
};
