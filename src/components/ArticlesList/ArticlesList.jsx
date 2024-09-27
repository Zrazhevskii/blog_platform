import './ArticlesList.css';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Pagination } from 'antd';
import { PuffLoader } from 'react-spinners';
import { useGetArticlesQuery } from '../../servises/articlesApi';
import { toggleCurrentPage } from '../../redusers/ArticlesListReduser';
import PostsItem from '../../pages/PostsItem/PostsItem';

export default function ArticlesList() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.articles);
    const { data, isLoading, isError } = useGetArticlesQuery({ currentPage });

    if (isLoading) {
        return (
            <div className="loader">
                <PuffLoader color="#52c4a1" size={150} />
            </div>
        );
    }

    if (isError) {
        return (
            <Alert message="Error" description="Что-то пошло не так, перегрузите страницу..." type="error" showIcon />
        );
    }

    return (
        <>
            <div className="posts__list">
                {data?.articles.map((elem) => {
                    return <PostsItem elem={elem} key={elem.slug} />;
                })}
            </div>
            <div className="post__list__pagination">
                <Pagination
                    showSizeChanger={false}
                    defaultCurrent={currentPage}
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
