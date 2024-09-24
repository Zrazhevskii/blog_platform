import { configureStore } from '@reduxjs/toolkit';
import PostsListReduser from '../redusers/PostsListReduser';

const store = configureStore({
    reducer: {
        posts: PostsListReduser,
    },
});

export default store;
