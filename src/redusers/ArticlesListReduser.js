import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentPage: 1,
    inAccount: false,
    succes: false,
    error: false,
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
        toggleSucces: (state, { payload }) => {
            // eslint-disable-next-line no-param-reassign
            state.succes = payload;
        },
        toggleError: (state, action) => {
            // console.log(action);
            // eslint-disable-next-line no-param-reassign
            state.error = action.payload;
        },
    },
});

export const { toggleCurrentPage, toggleInAccount, toggleSucces, toggleError } = ArticlesListReduser.actions;
export default ArticlesListReduser.reducer;
