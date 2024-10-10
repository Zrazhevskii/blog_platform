import PropTypes from 'prop-types';
import './ArticlesItem.css';
import { format } from 'date-fns';
import { changeUserName } from '../../helpers/changeUserName';
import ArticleTitleBox from '../../components/ArticleTitleBox';

export default function ArticlesItem({ elem }) {
    const { createdAt, author } = elem;
    const { username, image } = author;
    const date = createdAt ? format(createdAt, 'MMMM dd, yyyy') : 'Дата неуказана';

    return (
        <section className="article__header article__header_margin">
            <ArticleTitleBox elem={elem} isArticle={false} />
            <div className="user">
                <div className="user__content">
                    <span className="user__name">{changeUserName(username)}</span>
                    <span className="user__created">{date}</span>
                </div>
                <img src={image} alt="автор" className="user__img" />
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
