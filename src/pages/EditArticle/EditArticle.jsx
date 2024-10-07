// import React from 'react'

import { useParams } from 'react-router-dom';
import { useGetArticleItemQuery } from '../../servises/articlesApi';
import NewArticle from '../NewArticle';

export default function EditArticle() {
    const { slug } = useParams();
    // const {}
    // const { data, isLoading, isSuccess } = useGetArticleItemQuery(slug);
    const { data } = useGetArticleItemQuery(slug);
    // const { article } = data;
    // console.log(data.article.title);

    return <NewArticle article={data ? data.article : {}} />;
}
