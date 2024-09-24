import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [
        {
            slug: 'how-to-train-your-dragon',
            title: 'How to train your dragon',
            description: 'Ever wonder how?',
            body: 'It takes a Jacobian',
            tags: ['dragons', 'training'],
            createdAt: '2021-02-18T03:22:56.637Z',
            updatedAt: '2021-02-18T03:48:35.824Z',
            favorited: false,
            favoritesCount: 0,
            author: {
                username: 'jake',
                bio: 'I work at State Farm.',
                image: 'https://filmschoolrejects.com/wp-content/uploads/2020/04/BigLebowski-700x480.jpg',
                following: false,
            },
        },
        {
            slug: 'how-to-train-your-dragon-2',
            title: 'How to train your dragon 2',
            description: 'So toothless',
            body: 'It is a dragon',
            tags: ['dragons', 'training'],
            createdAt: '2021-02-18T03:22:56.637Z',
            updatedAt: '2021-02-18T03:48:35.824Z',
            favorited: false,
            favoritesCount: 0,
            author: {
                username: 'jake',
                bio: 'I work at State Farm.',
                image: 'https://filmschoolrejects.com/wp-content/uploads/2020/04/BigLebowski-700x480.jpg',
                following: false,
            },
        },
    ],
    loading: false,
    error: false,
};

const ArticlesListReduser = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPosts: (state, action) => {
            return { ...state, posts: [...state.posts, ...action.payload] };
        },
    },
});

export const { addPosts } = ArticlesListReduser.actions;
export default ArticlesListReduser.reducer;
