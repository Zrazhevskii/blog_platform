// import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import './PostsList.css';
import Post from '../../pages/Post/Post';

export default function PostsList() {
    const posts = useSelector((state) => state.posts.posts);
    // console.log(posts);
    return (
        <div className="posts__list">
            {posts.map((elem) => {
                return <Post elem={elem} key={uuidv4()} />;
            })}
        </div>
    );
}
