import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    isAuthenticated: false,
    inAccount: false,
};

const ArticlesListReduser = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        toggleCurrentPage: (state, { payload }) => {
            // eslint-disable-next-line no-param-reassign
            state.currentPage = payload;
        },
    },
});

export const { toggleCurrentPage } = ArticlesListReduser.actions;
export default ArticlesListReduser.reducer;
