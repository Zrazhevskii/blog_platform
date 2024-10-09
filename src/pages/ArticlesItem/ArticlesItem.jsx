import './ArticlesItem.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { changeUserName } from '../../helpers/changeUserName';
import ArticleTitleBox from '../../components/ArticleTitleBox';

export default function ArticlesItem({ elem }) {
    const { createdAt, author } = elem;
    const { username, image } = author;
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';

    return (
        <section className="post__box post__box_shadow-margin">
            <ArticleTitleBox elem={elem} isArticle={false} />
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

ArticlesItem.propTypes = {
    elem: PropTypes.shape({
        createdAt: PropTypes.string,
        author: PropTypes.shape({
            username: PropTypes.string,
            image: PropTypes.string,
        }),
    }),
};
