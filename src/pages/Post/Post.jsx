import './Post.css';
import PropTypes from 'prop-types';

export default function Post({ elem }) {
    const { title, favoritesCount } = elem;
    // console.log(favoritesCount);
    console.log(elem);
    return (
        <div className="post__box">
            <div className="post__box__content">
                <div className="post__box__title__box">
                    <h4 className="post__box__title">{title}</h4>
                    <div className="post__box__favorites">{favoritesCount}</div>
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    elem: PropTypes.shape({
        title: PropTypes.string,
        favoritesCount: PropTypes.number,
    }),
};
