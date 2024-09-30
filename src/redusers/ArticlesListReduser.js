import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
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
        toggleInAccount: (state, { payload }) => {
            // eslint-disable-next-line no-param-reassign
            state.inAccount = payload;
        },
    },
});

export const { toggleCurrentPage, toggleInAccount } = ArticlesListReduser.actions;
export default ArticlesListReduser.reducer;
