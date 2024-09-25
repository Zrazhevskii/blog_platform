// import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { useSelector } from 'react-redux';
import './ArticlesList.css';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { useGetArticlesQuery } from '../../servises/articlesApi';
import { toggleCurrentPage } from '../../redusers/ArticlesListReduser';
import Post from '../../pages/Post/Post';

export default function ArticlesList() {
    const dispatch = useDispatch();
    const { currentPage } = useSelector((state) => state.articles);
    const { data } = useGetArticlesQuery({ currentPage });
    console.log(currentPage);
    return (
        <>
            <div className="posts__list">
                {data?.articles.map((elem) => {
                    return <Post elem={elem} key={elem.slug} />;
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
