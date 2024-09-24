// import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { useSelector } from 'react-redux';
import './ArticlesList.css';
import { useGetArticlesQuery } from '../../servises/articlesApi';
// import { useG }
import Post from '../../pages/Post/Post';

export default function ArticlesList() {
    const { data } = useGetArticlesQuery();
    console.log(data);
    // const posts = useSelector((state) => state.posts.posts);
    // console.log(posts);
    return (
        <div className="posts__list">
            {data.map((elem) => {
                return <Post elem={elem} key={elem.slug} />;
            })}
        </div>
    );
}
