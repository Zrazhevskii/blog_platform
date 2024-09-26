import './ArticlesList.css';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { useGetArticlesQuery } from '../../servises/articlesApi';
import { toggleCurrentPage } from '../../redusers/ArticlesListReduser';
import PostsItem from '../../pages/PostsItem/PostsItem';

export default function ArticlesList() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.articles);
    const { data } = useGetArticlesQuery({ currentPage });
    // console.log(currentPage);
    return (
        <>
            <div className="posts__list">
                {data?.articles.map((elem) => {
                    return <PostsItem elem={elem} key={elem.slug} />;
                })}
                {/* {articles?.map((elem) => {
                    return <Post elem={elem} key={elem.slug} />;
                })} */}
            </div>
            <div className="post__list__pagination">
                <Pagination
                    showSizeChanger={false}
                    defaultCurrent={1}
                    total={data?.articlesCount}
                    pageSize={5}
                    hideOnSinglePage
                    responsive
                    onChange={(page) => dispatch(toggleCurrentPage(page))}
                />
            </div>
        </>
    );
}
